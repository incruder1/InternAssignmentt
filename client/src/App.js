import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./page/HomePage";
import Login from "./page/auth/login.jsx";
import SignUp from "./page/auth/signup.jsx"; 
import { Toaster } from "react-hot-toast"; 
import AddImage from "./page/AddImage.jsx";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
         
        <Route path="/login" element={<Login />} />
        <Route path="/addimage" element={<AddImage />} />
        
        <Route path="/signup" element={<SignUp />} />
        </Routes>
      <Toaster />
    </>
  );
}

export default App;
