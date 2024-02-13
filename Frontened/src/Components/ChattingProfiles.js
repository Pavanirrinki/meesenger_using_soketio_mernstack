import React,{useState,useEffect} from 'react'

import axios from 'axios';
import { API } from '../Components/API/API';
import io from "socket.io-client";
import "../index.css"
function ChattingProfiles() {
const [conversation,setConversation] = useState(null);
const [conversationmessages,setConversationmessages] = useState(null);
const [receiverId,setReceiverId] = useState(null)
const [onlinedUsers,setOnlinedUsers] = useState(null)
const userdata = localStorage.getItem("user_data")
const parsed_user_data = JSON.parse(userdata)
const [message, setMessage] = useState("");
const [socketed,setSocketed] = useState(null)
const [typing,setTyping] = useState(null)
  
useEffect(()=>{
const socket = io(API, {
    query: {
        userId: parsed_user_data?.user?._id
    }
});

socket.on("Onlineusers",(data)=>{
 
  setOnlinedUsers(data)
  socket.on("newMessage",(data)=>setConversationmessages(data))
})
socket.on("Typing-started",(data)=>setTyping(data))
socket.on("Typing-stopped",(data)=>setTyping(data))

return()=>{socket.close();socket.off("newMessage")}
},[])

 const particularChat =(e,receiver) =>{
  e.preventDefault()
  setReceiverId(receiver)
  axios.get(API+`allmessages/${parsed_user_data?.user?._id}/${receiver}`).then((data)=>setConversationmessages(data.data)).catch((error)=>console.log(error.message))
  
 }
 const messageTypinghandler = (e) => {
  setMessage(e.target.value)
  socketed.emit("Typing",receiverId)
  console.log(socketed)
};

const sendMessage = () => {
    
  setTyping((prev)=>!prev)
 
  axios.post(API + `send_message/${receiverId}/${parsed_user_data?.user?._id }`, { message })
    .then((res) => {
    socketed.emit("Typing-stop",receiverId)  
     
      setMessage('');
    })
    .catch((error) => console.log(error.message));
}
useEffect(()=>{
setSocketed(io(API))
axios.get((API+`allmessagesofuser/${parsed_user_data?.user?._id}`)).then((data)=>setConversation(data.data)).catch((error)=>console.log(error.message))
},[])

  return (
    <div style={{ display: "flex", justifyContent: "space-between",minHeight:"100vh"}}>
    {/* PROFILES SECTION */}
    <div style={{ backgroundColor: "#6c6f7a", flex: "1", overflowY: "auto" }}>
        <div style={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>
            <input type='search' style={{ margin: "10px", padding: "5px 15px",borderRadius:"10px",width:"80%"}} 
            placeholder='Search users...' />

            {conversation?.conversation?.map((data, key) => {
  
    return (
        <div key={key} style={{ display: "flex", marginBottom: "10px" }}>
            <img
                src="https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=1024x1024&w=is&k=20&c=oGqYHhfkz_ifeE6-dID6aM7bLz38C6vQTy1YcbgZfx8="
                alt="yy"
                style={{ height: "80px", width: "80px", borderRadius: "50%", marginRight: "10px" }}
            />
            <div>
              
                {data.participants
                    ?.filter(participantId => participantId._id !== parsed_user_data?.user?._id )
                    .map(filteredParticipantId => {
                       
                        return (
                            <p key={filteredParticipantId} style={{ margin: "0px" }} >
                               <h3 style={{ marginBottom: "0px" }} onClick={(e) => particularChat(e, filteredParticipantId?._id)}> {filteredParticipantId.username}</h3>
                               
                              {console.log((receiverId,conversationmessages))}
                              {onlinedUsers?.includes?.(filteredParticipantId?._id)?(typing == "Typing"?"typing":"online"):"offline"}
                             
                            </p>
                        );
                    })}
            </div>
        </div>
    );
})}

        </div>
    </div>

    {/* CONVERSATION SECTION */}
    <div style={{ width: "70vw" }}>
      {receiverId &&
    <div className='profile_container' >

    </div>}
  {receiverId ? 
    <div className="container">
      
      <ul className="message-list">
        {conversationmessages?.conversation?.participants?.includes(receiverId) && conversationmessages?.conversation?.messages?.map((data) => { 
          return (
            <li className={data?.creater === parsed_user_data?.user?._id ? "message sent" : "message received"}>{data.message}</li>
          );
        })}
      </ul>
      <div className="input-container">
        <input type="text" className="input-field" placeholder="Type your message..." value={message} onChange={messageTypinghandler} />
        <button className="send-button" onClick={sendMessage}>Send</button>
      </div>
    </div>
    : (
      <div style={{ display: "flex", justifyContent: "center", flex: "1",marginTop:"10%"}} className="card">
        <h4 style={{ textAlign: "center",lineHeight:"50px"}}>Hi, <span style={{color:"grey",fontSize:"20px"}}>{parsed_user_data?.user?.username}</span><br /> Welcome To Messenger application</h4>
      </div>
    )
  }
</div>

   
</div>


  )
}

export default ChattingProfiles
