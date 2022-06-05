import React, { useState } from 'react';
import './App.css';

const App = () => {

  const [fullname,setfullName] = useState({
    username : "",
    password : "",
  });

  const [newset,setnewset] = useState();

  const inChange = (event) =>{
    const val = event.target.value;
    const name = event.target.name;

    setfullName((preValue)=>{
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
    setnewset(fullname.username+" "+fullname.password);
    console.log(JSON.stringify({
      username: fullname.username,
      password: fullname.password
    }))
    fetch("http://127.0.0.1:8000/auth/", {
      "method": "POST",
      "headers": {
        "content-type": "application/json",
        "accept": "application/json"
      },
      "body": JSON.stringify({
        username: fullname.username,
        password: fullname.password
      })
    })
    .then(response => response.json())
    .then(response => {
      // this.setState({
      //   friends: response
      // })
      console.log(response)
    })
    .catch(err => { console.log(err); 
    });
    
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
          value={fullname.username}
          />
          <div>
          <input className="input-box" type="password" placeholder="Enter your last name"
          name='password'
          onChange={inChange}
          value={fullname.password}
          />
          <button className="myButton" onClick={onSubmit}>Submit</button>
          </div>
          </div>
        </div>
        </form>
        </>
  );
}

export default App;
