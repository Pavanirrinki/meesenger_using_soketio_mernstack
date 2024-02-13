const express = require("express");
const middleware = require("../Middleware/middleware.js")
const messagemodel = require("../Models/MessagesModel.js")
const Conversation = require("../Models/AllMessagesmodel.js");

const router = express();



router.get("/allmessages/:id/:creator",async(req,res)=>{
    try{
        let conversation = await Conversation.findOne({
            participants: { $all: [req.params.creator, req.params.id] },
        }).populate("messages");
       
      
if(conversation){
   
    return res.status(200).json({conversation})
}else{
    return res.status(200).json([])
}
        
    }catch(error){
        return res.status(500).json("internal server error")
    }
})

router.get("/allmessagesofuser/:id",async(req,res)=>{
    

    try{
        let conversation = await Conversation.find({
            participants: { $in: [req.params.id] },
        }).populate("messages").populate("participants");
       
if(conversation){
    return res.status(200).json({conversation})
}else{
    return res.status(200).json([])
}
        
    }catch(error){
        return res.status(500).json("internal server error")
    }
})


// router.post("/send_message/:id/:creator",async(req,res)=>{
//     try{
        
//   const {message} = req.body;
//   let conversation = await Conversation.findOne({
//     participants: { $all: [req.params.creator, req.params.id] },
//   });
  
//     if (!conversation) {
        
//         conversation = await Conversation.create({
//             participants: [req.params.creator, req.params.id],
//         });
//     }
  
//     const newMessage = new messagemodel({
//         creater:req.params.creator,
//         receiver:req.params.id,
//         message,
//     });
//     if (newMessage) {
        
//         conversation.messages.push(newMessage._id);
//     }
  
    
//     await Promise.all([conversation.save(), newMessage.save()]);
  
    
//   return  res.status(201).json({newMessage,conversation});
//   }catch(error){
//    return res.status(500).json("internal server error")
//   }
//   })
module.exports = router