import logo from './logo.svg';
import './App.css';
import CombinedScreen from './CombinedScreen';

import { BrowserRouter ,Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import Signup from './Components/Signup';
function App() {
  const userdata = localStorage.getItem("user_data");
  const parsed_user_data = JSON.parse(userdata)
  useEffect(()=>{
console.log(userdata,"nullllll")
  },[])
  return (
    <div>
     
      <BrowserRouter>
      <Routes>

{!userdata &&
<Route path="/" element={ <Signup />} />}

<Route path="/chat_screen" element ={<CombinedScreen />} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
