import React, { useContext } from 'react'
import './CartItems.css'
import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";
import { AiOutlineDelete } from "react-icons/ai";
import { Cartcontext } from '../CartContext';
function CartItems({cartItems}) {
   const {dispatch}=useContext(Cartcontext)
//    console.log("cart items",cartItems);
    return (
        <>
            <div className="cart-item">

                <div className="dish-img-name-rate">

                    
                    <div className="dish-name">
                        {cartItems.name}
                    </div>
                    <div className="dish-rate">
                        ₹{cartItems.rate}
                    </div>
                </div>

                <div className="btns">
                    <div className='operations'>


                        <button  className='opr-btns' onClick={()=>dispatch({type:'inc-qty',data:cartItems,id:cartItems._id})} ><CiCirclePlus /></button>


                        <span>{cartItems.qty}</span>


                        <button  className="opr-btns" onClick={()=>dispatch({type:'dec-qty',data:cartItems,id:cartItems._id})} ><CiCircleMinus /></button>

                    </div>

                    <button className="del-btn" onClick={()=>dispatch({type:'remove-from-cart',id:cartItems._id})} >
                        <AiOutlineDelete />
                    </button>
                </div>
            </div>
        </>
    )
}

export default CartItems