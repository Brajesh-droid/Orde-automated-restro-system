import React from 'react'
import { NavLink } from 'react-router-dom'
import './Opening.css'
function Opening() {
  return (
    <>

      <div className='open-panel-body'>


        <div className="open-panel">

          

         

          <h4>Entering as Customer or Owner</h4>


          <NavLink className='open-btn' to='/scanner' >Customer</NavLink>



          <NavLink className='open-btn' to='/login' >Owner</NavLink>

          </div>
        

      </div>

    </>
  )
}

export default Opening