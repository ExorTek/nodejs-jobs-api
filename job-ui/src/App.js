import './App.css';
import { Route, Routes } from "react-router-dom";
import Home from "./component/home";
import Login from "./component/login";
import Register from "./component/register";
import Navbar from "./component/navbar";

function App () {
    return (
       <div>
           <Navbar/>
           <Routes>
               <Route path="/" element={<Home />} />
               <Route path="login" element={<Login />} />
               <Route path="register" element={<Register />} />
           </Routes>
       </div>

    );
}

export default App;
