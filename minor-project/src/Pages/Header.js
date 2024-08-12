import React, { useContext } from 'react'

import { BsCart2 } from "react-icons/bs";
import { BiSearch } from "react-icons/bi";
import Dropdown from 'react-bootstrap/Dropdown';
import './Header.css'
import { Cartcontext } from '../CartContext';
import CartPanel from './CartPanel';



function Header() {

    // console.log("headers",cartObj);
    const { cartState: { cart } } = useContext(Cartcontext);
    return (
        <>

            <div className='navbar'>

                 <h1>Restaurant</h1>
                {/* <img src='logo.png' ></img> */}

                <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        <BsCart2 />
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <div className="cart">

                            {(cart.length == 0) ?
                                <div className='cartEmpty' >

                                </div>
                                :

                                <CartPanel />
                            }

                        </div>
                    </Dropdown.Menu>
                </Dropdown>

            </div>

        </>
    )
}

export default Header