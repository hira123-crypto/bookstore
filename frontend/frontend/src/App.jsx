import React from 'react';
import Home from './home/Home';
import { Routes, Route, Navigate } from "react-router-dom"; // ✅ Added Navigate
import Courses from './courses/Courses';
import { Toaster } from 'react-hot-toast'; 
import Signup from './components/Signup'; 
import ContactUs from "./components/ContactUs";
import { useAuth } from './context/authprovider.jsx';

function App() {
  const [authUser, setAuthUser] = useAuth();
  console.log(authUser);

  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/course' element={authUser ? <Courses/> : <Navigate to="/signup" />}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/contact' element={<ContactUs/>}/>
      </Routes>
      <Toaster /> {/* For toast notifications */}
    </>
  );
}

export default App;
