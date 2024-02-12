import React, { useEffect } from 'react'
import io from "socket.io-client"
import { API } from './API/API'
function ConversationScreen() {
  useEffect(()=>{
const socket = io(API)
  },[])
  return (
    <div>
      
    </div>
  )
}

export default ConversationScreen
