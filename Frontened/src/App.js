import logo from './logo.svg';
import './App.css';
import CombinedScreen from './CombinedScreen';
import Login from './Components/Login';
import { BrowserRouter ,Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
function App() {
  const userdata = localStorage.getItem("user_data")
  useEffect(()=>{

  },[])
  return (
    <div>
     
      <BrowserRouter>
      <Routes>
      
        <Route
        path="/"
        element={ (userdata ? <Navigate to="/chat_screen" /> : <Login  />)}
      />
        <Route path="/chat_screen"  element={<CombinedScreen />} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
