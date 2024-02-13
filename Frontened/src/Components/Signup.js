import React, { useState } from 'react'
import useFetch from './useFetchhook'
import axios from 'axios'
import { API } from './API/API'
import { useNavigate } from 'react-router-dom';
function Signup() {
	const [username,setUsername] = useState('')
	const [email,setEmail] = useState('')
	const [password,setPassword] = useState('')
	const [loginEmail,setLoginEmail] = useState('')
	const [loginPassword,setLoginpassword] = useState('')
	const navigate = useNavigate()
const formsubmitHandler =(e) =>{
  e.preventDefault()
  axios.post(API+'signup',{email,password,username}).then((res)=>{console.log(res.data);
	setUsername("");setEmail("");setPassword('')}).catch((error)=>console.log(error.message))
}

const logiformHandler =(e) =>{
	e.preventDefault()
  axios.post(API+'login',{email:loginEmail,password:loginPassword}).then((res)=>{localStorage.setItem("user_data",JSON.stringify(res.data));
	setEmail("");setPassword('')}).catch((error)=>console.log(error.message))
	setTimeout(()=>{
    navigate("/chat_screen")
	},2000)
}

  return (
<div class="main">  	
		<input type="checkbox" id="chk" aria-hidden="true" className='input_class'/>

			<div class="signup">
				<form>
					<label for="chk" aria-hidden="true" style={{color:"black"}}>Sign up</label>
					<input type="text" name="txt" placeholder="User name" required=""  className='input_class' 
					value={username} onChange={(e)=>setUsername(e.target.value)}/>
					<input type="email" name="email" placeholder="Email" required="" className='input_class'
					value={email} onChange={(e)=>setEmail(e.target.value)}/>
					<input type="password" name="pswd" placeholder="Password" required="" className='input_class'
					value={password} onChange={(e)=>setPassword(e.target.value)}/>
					<button className='button_class' onClick={(e)=>formsubmitHandler(e)}>Sign up</button>
				</form>
			</div>

			<div class="login">
				<form>
					<label for="chk" aria-hidden="true">Login</label>
					<input type="email" name="email" placeholder="Email" required="" className='input_class'
					value={loginEmail} onChange={(e)=>setLoginEmail(e.target.value)}/>
					<input type="password" name="pswd" placeholder="Password" required="" className='input_class'
					value={loginPassword} onChange={(e)=>setLoginpassword(e.target.value)}/>
					<button className='button_class'  onClick={(e)=>logiformHandler(e)}>Login</button>
				</form>
			</div>
	</div>
  )
}

export default Signup