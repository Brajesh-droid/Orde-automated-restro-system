import React,{useEffect, useState,useContext} from 'react'
import CartItems from './CartItems'
import './CartPanel.css'
import {Cartcontext} from '../CartContext';
import {NavLink} from 'react-router-dom'
function CartPanel() {
   const {cartState:{cart}}=useContext(Cartcontext)
   const [total,setTotal]=useState(0);
  //  console.log(cart);

  useEffect(() => {
   
    setTotal(cart.reduce((acc,curr)=>{
      acc=acc+curr.qty*curr.rate;
      return acc
    },0))

  })
  
  return (
   <>
      
        
           <h1>My Order</h1>
            
           <div className="items-list">

           {cart.map((val,id)=>{
            
             return <CartItems key={id} cartItems={val} />
           })}
           </div>
           <div className="totalPanel">
           
             <div className="sub-total">
                <h3>Subtotal</h3>
                <h3>{total}</h3>  
             </div>
               <NavLink to='/summary' className='pay-btn'>Summary</NavLink>
           </div>

      
   </>
  )
}

export default CartPanel