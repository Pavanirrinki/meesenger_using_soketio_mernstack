import axios from 'axios'
import React,{useState,useEffect} from 'react'
import { API } from './API/API'

function Login() {
const [email,setEmail] = useState('')
const [password,setPassword] = useState('')
const submitform=(e)=>{
    e.preventDefault()
axios.post(API+'login',{email,password}).then((res)=>localStorage.setItem("user_data",JSON.stringify(res.data))).catch((error)=>console.log(error.message))
}
  return (
    <div>
        <form onSubmit={submitform}>
<input type="text"  placeholder='email' value={email} onChange={(e)=>setEmail(e.target.value)}/><br />
<input type="password"  placeholder='password' value={password} onChange={(e)=>setPassword(e.target.value)}/><br />
<input type="submit" value="Submit" />
</form>
    </div>
  )
}

export default Login