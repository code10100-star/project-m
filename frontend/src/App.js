import React from 'react'
import {Route} from 'react-router-dom'
import {BrowserRouter , Routes } from 'react-router-dom'
import Navbar from "./Components/Navbar"
import Home from "./Components/Home"
import About from "./Components/About"
import Contact from "./Components/Contact"
import Signin from "./Components/Signin"
import Register from "./Components/Signup"
import Profile from"./Components/Profile"

const App = () => {
  return (
    <>
    
    <BrowserRouter>
    <Navbar/>
    <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/about" element={<About />} />
    <Route path="/contact" element={<Contact />} />
    <Route path="/signup" element={<Register />} />
    <Route path="/signin" element={<Signin />} />
    <Route path="/profile" element={<Profile />} />
    </Routes>
    </BrowserRouter>

    </>

  )
}

export default App;

