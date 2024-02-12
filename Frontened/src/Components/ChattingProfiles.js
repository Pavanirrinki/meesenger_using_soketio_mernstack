import React,{useState,useEffect} from 'react'
import ConversationScreen from './ConversationScreen'
import axios from 'axios';
import { API } from '../Components/API/API';
import io from "socket.io-client"
function ChattingProfiles() {
const [conversation,setConversation] = useState(null);
const [conversationmessages,setConversationmessages] = useState(null);
const [receiverId,setReceiverId] = useState(null)
const [onlinedUsers,setOnlinedUsers] = useState(null)
const userdata = localStorage.getItem("user_data")
const parsed_user_data = JSON.parse(userdata)
const [message, setMessage] = useState("");


  const sendMessage = () => {
    axios.post(API + `send_message/${receiverId}/${parsed_user_data?.user?._id }`, { message })
      .then((res) => {
       
        setMessage('');
      })
      .catch((error) => console.log(error.message));
  }
 useEffect(()=>{
axios.get((API+`allmessagesofuser/${parsed_user_data?.user?._id}`)).then((data)=>setConversation(data.data)).catch((error)=>console.log(error.message))
 },[])
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

return()=>{socket.close();socket.off("newMessage")}
},[])

 const particularChat =(e,receiver) =>{
  e.preventDefault()
  setReceiverId(receiver)
  axios.get(API+`allmessages/${parsed_user_data?.user?._id}/${receiver}`).then((data)=>setConversationmessages(data.data)).catch((error)=>console.log(error.message))
  
 }
 const sendit = () => {
  

};
  return (
    <div style={{ display: "flex", justifyContent: "space-between", height: "100vh" }}>
    {/* PROFILES SECTION */}
    <div style={{ backgroundColor: "#6c6f7a", flex: "1", overflowY: "auto" }}>
        <div style={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>
            <input type='search' style={{ margin: "10px", padding: "5px 15px" }} />

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
                        // console.log("1233444", filteredParticipantId);
                        return (
                            <p key={filteredParticipantId} style={{ margin: "0px" }} >
                               <h3 style={{ marginBottom: "0px" }} onClick={(e) => particularChat(e, filteredParticipantId?._id)}> {filteredParticipantId.username}</h3>
                               {onlinedUsers?.includes?.(filteredParticipantId?._id)?"online":"offline"}
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
    <div style={{  width: "70vw" }}>
      
       <div>
      <div class="container">
        <ul class="message-list">
          {conversationmessages?.conversation?.participants?.includes(receiverId) &&conversationmessages?.conversation?.messages?.map((data) =>{ 
           
            return (
            <li className={data?.creater === parsed_user_data?.user?._id ? "message sent" : "message received"}>{data.message}</li>
            )
            })}
        </ul>
        <div class="input-container">
          <input type="text" class="input-field" placeholder="Type your message..." value={message} onChange={(e) => setMessage(e.target.value)} />
          <button class="send-button" onClick={sendMessage}>Send</button>
         
        </div>
      </div>
    </div>


    </div>
   
</div>


  )
}

export default ChattingProfiles
