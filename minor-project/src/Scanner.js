import React,{useState,useContext} from 'react'
import { QrReader } from 'react-qr-reader';
import { NavLink } from 'react-router-dom';
import {Tablenumber} from './TableNumContext'
import './Scanner.css'
function Scanner() {
    const {table,setTable}=useContext(Tablenumber)
    const [data, setData] = useState('No result');
  return (
    <>
    <div className="camera">

    <QrReader
        onResult={(result, error) => {
          if (!!result) {
            setTable(result?.text);
          }

          if (!!error) {
            console.info(error);
          }
        }}
        containerStyle={{ width: '400px' }}
        style={{ width: '400px' }}
      />
       </div> 

<div className="data">

      <p>Your table number is {table}</p>
      {/* {(data!=='no data'?<NavLink className='sender' to={'/menu'} >Open menu</NavLink>:<h1></h1>)} */}
<NavLink className='sender' to={'/menu'} >Open menu</NavLink>
</div>
    </>
  )
}

export default Scanner