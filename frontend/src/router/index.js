import React from 'react'
import {Route} from 'react-router-dom'
import {BrowserRouter , Routes} from 'react-router-dom'

import Home from "../Components/Home"
import About from "../Components/About"
import Contact from "../Components/Contact"
import Signin from "../Components/Signin"
import Profile from"../Components/Profile"
import Signup from '../Components/Signup'
import Navbar from '../Components/Navbar'
import Profilepass from '../Components/Profilepass'

const index = () => {
    return (
        <BrowserRouter>
        <Navbar /
        
        >
        <Routes>  
        
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/profile" element={<Profile />} />

        </Routes>
        <Routes>
          <Route path="/profilepass" element={<Profilepass/>}/>
        </Routes>
        </BrowserRouter>

    );
  }





export default index;