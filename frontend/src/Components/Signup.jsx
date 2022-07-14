import React, { useState } from "react";
import AuthService from '../Services/AuthService';
import "./styles/Signup.css";

const Signup = () => {
  const [credentials, setCredentials] = useState({
    Name: "",
    email: "",
    username: "",
    password1: "",
    password2: "",
  });

  const inChange = (event) =>{
    const val = event.target.value;
    const name = event.target.name;

    setCredentials((preValue)=>{
        if(name === "Name"){
          return{
            Name: val,
            email: preValue.email,
            username: preValue.username,
            password1: preValue.password1,
            password2: preValue.password2,
          };
        }
        else if(name === "username"){
          return{
            Name: preValue.Name,
            email: preValue.email,
            username: val,
            password1: preValue.password1,
            password2: preValue.password2,
          };
        } else if(name === "email"){
          return{
            Name: preValue.Name,
            email: val,
            username: preValue.username,
            password1: preValue.password1,
            password2: preValue.password2,
          };
        }
        else if(name === "password1"){
          return{
            Name: preValue.Name,
            email: preValue.email,
            username: preValue.username,
            password1: val,
            password2: preValue.password2,
          };
        }
        else if(name === "password2"){
          return{
            Name: preValue.Name,
            email: preValue.email,
            username: preValue.username,
            password1: preValue.password1,
            password2: val,
          };
        }
    });
  }

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(credentials);
    AuthService.register(JSON.stringify(credentials))
  };

  return (
    <div className="Signup">
      <form className="card">
        <input className="input-box" type="text" name = 'Name' onChange={inChange} value={credentials.Name} placeholder="Name"></input>
        <input
          className="input-box"
          type="text"
          value={credentials.username}
          placeholder="Username"
          name = 'username' onChange={inChange}
        ></input>
        <input
          className="input-box"
          type="email"
          value={credentials.email}
          placeholder="Email"
          name = 'email' onChange={inChange}
        ></input>
        <input
          className="input-box"
          type="password"
          value={credentials.password1}
          placeholder="password"
          name = 'password1' onChange={inChange}
        ></input>
        <input
          className="input-box"
          type="password"
          value={credentials.password2}
          placeholder="confirm your password"
          name = 'password2' onChange={inChange}
        ></input>
        <button className="style_button" onClick={onSubmit}>
          SignUp
        </button>
      </form>
    </div>
  );
};

export default Signup;
