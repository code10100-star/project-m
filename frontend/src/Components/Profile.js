import React,{useState} from 'react'

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
      <div className="col-md-3 ">
        <div className="demo1">
          <div className='heading'>
          <h1 >Your Account</h1>
          </div>
        <div className='row'>
        <div className="  btn-group-vertical btn-group-lg col-12" >
                <button type="submit" className="btn btn-primary bn " onClick={Postdata}>
                  Edit Profile
                </button>
                <button type="submit" className="btn btn-primary bn " onClick={Postdata}>
                  Change Password
                </button>
          </div>
          </div>
          </div>
      </div>
    <div className="col-md-8">
      <div className="demo2">
    <div className='heading'>
            <h1>Account Information</h1>
          </div>
            <form>
              <div className="mb-3">
                <label className="sameline">First Name</label>
                <input
                  type="text"
                  className="form-control input-box input"
                  placeholder="Enter first name"
                  autoComplete="Off"
                  value={user.fname}
                  name="fname"
                  onChange={handleInputs}
                />
              </div>
              <div className="mb-3">
                <label>Last Name</label>
                <input
                  type="text"
                  className="form-control input-box"
                  placeholder="Enter last name"
                  autoComplete="off"
                  value={user.lname}
                  name="lname"
                  onChange={handleInputs}
                />
              </div>
              <div className="mb-3">
                <label>Email</label>
                <input
                  type="email"
                  className="form-control input-box"
                  placeholder="Enter email"
                  autoComplete="off"
                  value={user.email}
                  name="email"
                  onChange={handleInputs}
                />
              </div>
              <div className="mb-3">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control input-box"
                  placeholder="Enter password"
                  autoComplete="off"
                  value={user.password}
                  name="password"
                  onChange={handleInputs}
                />
              </div>
              <div className="mb-3">
                <label>Confirm Password</label>
                <input
                  type="password"
                  className="form-control input-box"
                  placeholder="Enter password"
                  autoComplete="off"
                  value={user.cpassword}
                  name="cpassword"
                  onChange={handleInputs}
                />
              </div>
              <div className="d-grid">
                <button type="submit" className="btn btn-primary bn " onClick={Postdata}>
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