import React from 'react'
import Navbar from "./Components/Navbar"
import Router from "./router/index"

const App = () => {
  return (
    <>
      {/* <Navbar/> */}
    {/* <BrowserRouter>
        <Routes>  
        
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/profile" element={<Profile />} />

        </Routes>
        </BrowserRouter> */}

    <Router/>
    </>
  )
}

export default App;

