import React from 'react'
import './styles/Signup.css'

const Signup = () => {
  return (
    <div className="Signup">
      <form className='card'>
        <input type="text" placeholder='Username'></input>
        <input type="email" placeholder='Email'></input>
        <input type="password" placeholder='password'></input>
        <button className='style_button'>SignUp</button>
      </form>
    </div>
  );
}

export default Signup