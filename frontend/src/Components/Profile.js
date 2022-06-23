import React,{useState} from 'react'
import "../App.css"

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

    const Postdata = async (e) => {
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
            <button type="submit" className="btn btn-lg btn-primary" onClick={Postdata}>
                Edit Profile
            </button>
            </div>
            <div className='d-grid'>
            <button type="submit" className="btn btn-lg btn-primary " onClick={Postdata}>
                Change Password
             </button>
             </div>
             <div className='d-grid'>
             <button type="submit" className="btn btn-lg btn-primary  " onClick={Postdata}>
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
                  autoComplete="Off"
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
                  autoComplete="off"
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
                  autoComplete="off"
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
                  autoComplete="off"
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
                  autoComplete="off"
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