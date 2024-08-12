import React,{useContext, useEffect, useState} from 'react'
import { Tablenumber } from '../TableNumContext'
import {Cartcontext} from '../CartContext'
import Header from './Header'
import Dish from './Dish'
import './Menu.css'

function Menu() {
    const {table}=useContext(Tablenumber)
    const [Arr,setArr]=useState();
    const {cartState:{products,cart},dispatch}=useContext(Cartcontext)
    useEffect(()=>{
      fetch('/getDishList')
        .then((res)=>res.json())
        .then((list)=>dispatch({type:"add-to-products",data:list}))
    },[])
    // console.log("data in menu file",products);
  return (
    <>
       <Header/>

       <div className='big-style'>
           <div className="welcome-div">
              
              <h2 className='big-text' > <span className='color-text'>Welcome</span> to the</h2>
              <h2 className='big-text'>world of tasty &</h2>
              <h2 className='big-text'>fresh food.</h2>
              <p>Your table number is {table}</p>
           </div>
           <img className='salad' src="salad.png" alt="" />
       </div>
       <div className="res-data">

        <p className='head' >Our regular menu</p>

        

       </div>
     
     <div className="dish-scroll">

       {products.map((val,id)=>{
           return(
            <div key={id} >
               <Dish DishObj={val} dispatchFunc={dispatch} />
            </div>
        )
    })}
    </div>
    
    </>
  )
}

export default Menu