import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import './Login.css'
function Login() {
  const navigate = useNavigate();
  const [userData, setData] = useState();

  let name, value;
  const handleInput = (e) => {
    
    name = e.target.name;
    value = e.target.value;
    
    setData({ ...userData, [name]: value })
  }
  let options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userData)
  }
  const sendData = async (e) => {
    console.log('onclick run');
    e.preventDefault();

    const res = await fetch('/login', options)
    const data = await res.json();
    console.log(data);
    if (res.status >= 400 || !data) {
      window.alert(data.error)
    } else {
      window.alert(data.message)
      navigate('/Analysis')
    }
  }



  return (
    <>
      {/* <div className="login">
        <form action="">


          <h2>Email</h2>
          <input type="email" name="email" onChange={handleInput} />

          <h2>Password</h2>
          <input type="text" name='password' onChange={handleInput} />


          <div>

            <button type="submit" name='login' onClick={sendData}>
              Login
            </button>

          </div>

        </form>
        <br />
        <NavLink to='/register' >Not have account</NavLink>
      </div> */}


      <div className="form-box">
        <form action='' className="form">
          <span className="title">Sign in</span>
          <span className="subtitle">Login your account with email and password.</span>
          <div className="form-container">
            
              {/* <input type="email" className="input" placeholder="Email"> */}
              <input type="email" className='input' placeholder='Email' name="email" onChange={handleInput} />
                {/* <input type="password" className="input" placeholder="Password"> */}
                <input type="password" className='input' placeholder='Password' name='password' onChange={handleInput} />
                </div>
                {/* <button>Sign in</button> */}
                <button type="submit" name='login' onClick={sendData}>
                   Sign in
                </button>
              </form>
              <div className="form-section">
                <p>Don't have an account? <NavLink to='/register' >Sign in</NavLink> </p>
              </div>
          </div>
        </>
        )
}

        export default Login