const express = require("express")
const app = express()
const cors = require("cors")
const messagemodel = require("./Models/MessagesModel.js")
const Conversation = require("./Models/AllMessagesmodel.js")
const mongoose = require("mongoose")
const userRoute = require("./Routes/UserRoute.js")
const messengerRoute = require("./Routes/MessageRoute.js")
require('dotenv').config()
const port = process.env.PORT || 8000
app.use(express.json())
app.use(cors({
    origin:"*"
}))

let onlineusers = {}
app.use("/",userRoute);
app.use("/",messengerRoute)
app.use(express.urlencoded({extended:true}))
mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("DB CONNECTED");
  });
  
  app.get("/",async(req,res)=>{
    return res.status(200).send("Server Connected")
  })
 const server = app.listen(port,()=>{
    console.log(`server running on ${port}`)
})

const io = require("socket.io")(server,{
  pingTimeout :60000,
  cors:{
    origin:"http://localhost:3000"
  }
});

  io.on("connection",(socket)=>{

 
  if(socket.handshake.query.userId !== "undefined"){
    onlineusers[socket.handshake.query.userId] = socket.id
  }
  




io.emit("Onlineusers",Object.keys(onlineusers))
  console.log(onlineusers)
  
socket.on("Typing",(data)=>{
 io.to(onlineusers[data]).emit("Typing-started","Typing")
})


socket.on("Typing-stop",(data)=>{
  io.to(onlineusers[data]).emit("Typing-stopped","Typingstopped")
 })


socket.on("disconnect",()=>{
  console.log("disconnected",socket.id);
  delete onlineusers[socket.handshake.query.userId]
  io.emit("Onlineusers",Object.keys(onlineusers))
  console.log(onlineusers)
})

})


app.post("/send_message/:id/:creator",async(req,res)=>{
  try{
 
const {message} = req.body;
let conversation = await Conversation.findOne({
  participants: { $all: [req.params.creator, req.params.id] },
});

  if (!conversation) {
      
      conversation = await Conversation.create({
          participants: [req.params.creator, req.params.id],
      });
  }

  const newMessage = new messagemodel({
      creater:req.params.creator,
      receiver:req.params.id,
      message,
  });
  if (newMessage) {
      
      conversation.messages.push(newMessage._id);
  }
  
  
  await Promise.all([conversation.save(), newMessage.save()]);


const message_data = await Conversation.findOne({
  participants: { $all: [req.params.creator, req.params.id] },
}).populate("messages");

io.to(onlineusers[req.params.id]).emit("newMessage", {conversation:message_data});
io.to(onlineusers[req.params.creator]).emit("newMessage", {conversation:message_data});
return  res.status(201).json({newMessage,conversation});
}catch(error){
 return res.status(500).json(error.message)
}
})


