import React from 'react'
import Home from './home/Home'
import { Routes, Route } from "react-router-dom"
import Courses from './courses/Courses'
import { Toaster } from 'react-hot-toast' 
import Signup from './components/Signup' 
import ContactUs from "./components/ContactUs";




function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/course' element={<Courses/>}/>
         <Route path='/signup' element={<Signup/>}/>
         <Route path='/contact' element={<ContactUs/>}/>

      </Routes>
      <Toaster /> {/* Add this for toast notifications */}
    </>
  )
}

export default App