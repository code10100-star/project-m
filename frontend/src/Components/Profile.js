import React,{useState} from 'react'
import "../App.css"
import { NavLink } from 'react-router-dom'

const Profile = () => {

    const [user,setUser]= useState({
        fname:"",lname:"",email:"",password:"",cpassword:""
    });

    let name, value;
    const handleInputs = (e) => {
      name = e.target.name;
      value = e.target.value;

      setUser({ ...user, [name]: value });
    }

    let url='/profile';

    const Postdata = async (e) => {
      e.preventDefault();

    const {fname,lname,email,password,cpassword}=user;

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        fname,lname,email,password,cpassword
      })
    });


      const data = await res.json();

      console.log(res.status);

      if (res.status === 422 || !data) {
        window.alert("Invalid credentials");
      }
      else {
        window.alert("Signin Successful");
      }
    }

    const Postlog = async (e) => {
        e.preventDefault();
    }

    return (
    <>
    <div className="Profile">
    <div className="modal-body row">
      <div className='col-md-1'></div>
      <div className="col-md-3">
        <div className="demo1">
          <div>
          <h1 className='heading'>Options</h1>
          </div>
          <hr className="hline"></hr>
          <div className="d-grid lined">
            <NavLink className="btn btn-lg btn-primary" to="/profile">
                Edit Profile
            </NavLink>
            </div>
            <div className='d-grid'>
            <NavLink className="btn btn-lg btn-primary " to="/profilepass">
                Change Password
             </NavLink>
             </div>
             <div className='d-grid'>
             <button type="submit" className="btn btn-lg btn-primary  " onClick={Postlog}>
                Logout
             </button>
             </div>
        </div>
      </div>
    <div className="col-md-7">
      <div className="demo2">
          <div>
            <h1 className='heading'>Account Information</h1>
          </div>
            <form>
              <div className="mb-3">
                <label className="sameline">First Name</label>
                <input
                  type="text"
                  className="custom form-control  "
                  placeholder="First name"
                  autoComplete="off"
                  value={user.fname}
                  name="fname"
                  onChange={handleInputs}
                />
              </div>
              <div className="mb-3">
                <label className="sameline">Last Name</label>
                <input
                  type="text"
                  className="custom form-control "
                  placeholder="Last name"
                  autoComplete="new-password"
                  value={user.lname}
                  name="lname"
                  onChange={handleInputs}
                />
              </div>
              <div className="mb-3">
                <label className="sameline">Email</label>
                <input
                  type="email"
                  className="custom form-control"
                  placeholder="Email"
                  autoComplete="new-password"
                  value={user.email}
                  name="email"
                  onChange={handleInputs}
                />
              </div>
              <div className="mb-3">
                <label className="sameline">Password</label>
                <input
                  type="password"
                  className="custom form-control "
                  placeholder="Password"
                  autoComplete="new-password"
                  value={user.password}
                  name="password"
                  onChange={handleInputs}
                />
              </div>
              <div className="mb-3">
                <label className="sameline">Confirm Password</label>
                <input
                  type="password"
                  className="custom form-control"
                  placeholder="Confirm password"
                  autoComplete="new-password"
                  value={user.cpassword}
                  name="cpassword"
                  onChange={handleInputs}
                />
              </div>
              <div className="customb">
                <button type="submit" className="btn btn-primary btn-lg bn" onClick={Postdata}>
                  Submit
                </button>
          </div>
      </form>
      </div>
      </div>
      </div>
      </div>
    </>
  )
}

export default Profile