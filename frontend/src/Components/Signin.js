import React, { useState } from 'react';
import AuthService from '../Services/AuthService';
import '../App.css';

const Signin = () => {

  const [credentials,setCredentials] = useState({
    username : "",
    password : "",
  });

  const [newset,setnewset] = useState();

  const inChange = (event) =>{
    const val = event.target.value;
    const name = event.target.name;

    setCredentials((preValue)=>{
        if(name === "username"){
          return{
            username:val,
            password:preValue.password,
          };
        }
        else if(name === "password"){
          return{
            username:preValue.username,
            password:val,
          };
        }
    });
  }
  
  const onSubmit = (e) =>{
    e.preventDefault();
    setnewset(credentials.username+" "+credentials.password);

    AuthService.login(JSON.stringify(credentials))
    
  }
  return(
        <>
        <form autoComplete="off" onSubmit={onSubmit}>
        <div>
          <h1 id='hh'>Hello {newset}</h1>
          <div id='demo'>
          <input  className="input-box" type="text" autoComplete="off" placeholder="Enter your first name"
          name='username'
          onChange={inChange}
          value={credentials.username}
          />
          <div>
          <input className="input-box" type="password" placeholder="Enter your last name"
          name='password'
          onChange={inChange}
          value={credentials.password}
          />
          <button className="myButton" onClick={onSubmit}>Submit</button>
          </div>
          </div>
        </div>
        </form>
        </>
  );
}

export default Signin