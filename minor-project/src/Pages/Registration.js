import React,{useState} from 'react'
import { NavLink } from 'react-router-dom'
import {useNavigate} from 'react-router'
import './Registration.css'
function Registration() {

    const navigate=useNavigate();
    const [userData,setUserData]=useState();
     let name,value;


    //  console.log(navigate)
    const handleinput=(e)=>{
         name=e.target.name;
         value=e.target.value;

        setUserData({...userData,[name]:value})
        
    }

    let options={
        method:'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(userData)
    }

    const  sendUserData=async (e)=>{
          e.preventDefault();
          
          const res=await fetch('/register',options)
          const data=await res.json();
           console.log(data);
          navigate('/login')

          
    }
    
  return (
    <>
      <div className="register">
        <form action="">

            <h2>Name</h2>
            <input type="text" name='name' onChange={handleinput} required/>


            <h2>Email</h2>
            <input type="email" name="email" onChange={handleinput} required/>

            <h2>Password</h2>
            <input type="text"  name="password" onChange={handleinput} required/>


            <div className="submit">
                <button type="submit" name='register' onClick={sendUserData} >
                    Register
                </button>
            </div>
        </form>

          <NavLink to='/login' >already have an account</NavLink>
      </div>
    </>
  )
}

export default Registration