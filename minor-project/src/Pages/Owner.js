import React from 'react'
import { NavLink } from 'react-router-dom'
function Owner() {
  return (
    <>
      <h1>Owner</h1>
      <NavLink to='/register' >register</NavLink>
      <NavLink to='/login' >login</NavLink>
      
    </>
  )
}

export default Owner