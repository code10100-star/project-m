import React,{useState} from 'react'

const Profile = () => {
    const [user,setUser]= useState({
        fname:"",lname:"",email:""
    });
    return (
    <>
    <div className="Profile">
      <div>
        <h1>Account Information</h1>
      </div>

      <form>
          <div>
          <div className="mb-3">
                <label>Email address</label>
                <input
                  type="email"
                  className="form-control input-box"
                  placeholder="Enter email"
                  autoComplete="off"
                  value={user.fname}
                  name="fname"
                />
              </div>
              <div className="mb-3">
                <label>Password</label>
                <input
                  type="text"
                  className="form-control input-box"
                  placeholder="Enter password"
                  autoComplete="off"
                  value={user.lanme}
                  name="lname"
                />
              </div>
              <div className="mb-3">
                <label>Password</label>
                <input
                  type="email"
                  className="form-control input-box"
                  placeholder="Enter password"
                  autoComplete="off"
                  value={user.email}
                  name="email"
                />
              </div>
          </div>
      </form>
    </div>
    </>
  )
}

export default Profile