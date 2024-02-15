import logo from './logo.svg';
import './App.css';
import CombinedScreen from './CombinedScreen';

import { BrowserRouter ,Routes, Route,Navigate} from 'react-router-dom';
import { useEffect, useState } from 'react';
import Signup from './Components/Signup';
function App() {
const [parsed_user_data,setParsed_user_data] = useState([null])
  useEffect(()=>{
    const userdata = localStorage.getItem("user_data");
     setParsed_user_data(JSON.parse(userdata))
  },[])
  return (
    <div>
     
      <BrowserRouter>
      <Routes>
      <Route
        exact
        path="/"
        element={parsed_user_data ? <Navigate to="/chat_screen" /> : <Signup />}
      />
      
      <Route
        path="/chat_screen"
        element={ <CombinedScreen />}
      />
    </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
