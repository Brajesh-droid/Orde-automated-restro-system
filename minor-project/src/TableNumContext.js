import { createContext,useState } from "react"
import React from 'react'
 export const Tablenumber=createContext();
function TableNumContext({children}) {
    const [table,setTable]=useState(101);
  return (
    <>
         <Tablenumber.Provider value={{table,setTable}}>
            {children}
         </Tablenumber.Provider>
    </>
  )
}

export default TableNumContext