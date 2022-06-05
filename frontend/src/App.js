import React, { useState } from 'react';
import './App.css';

const App = () => {

  const [fullname,setfullName] = useState({
    fname : "",
    lname : "",
  });

  const [newset,setnewset] = useState();

  const inChange = (event) =>{
    const val = event.target.value;
    const name = event.target.name;

    setfullName((preValue)=>{
        if(name === "fname"){
          return{
            fname:val,
            lname:preValue.lname,
          };
        }
        else if(name === "lname"){
          return{
            fname:preValue.fname,
            lname:val,
          };
        }
    });
  }

  const onSubmit = (e) =>{
    e.preventDefault();
    setnewset(fullname.fname+" "+fullname.lname);
  }
  return(
        <>
        <form autoComplete="off" onSubmit={onSubmit}>
        <div>
          <h1 id='hh'>Hello {newset}</h1>
          <div id='demo'>
          <input  className="input-box" type="text" autoComplete="off" placeholder="Enter your first name"
          name='fname'
          onChange={inChange}
          value={fullname.fname}
          />
          <div>
          <input className="input-box" type="text" placeholder="Enter your last name"
          name='lname'
          onChange={inChange}
          value={fullname.lname}
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
