import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Menu from './Pages/Menu';
import Scanner from './Scanner';
import Summary from './Pages/Summary';
import NewSummary from './Pages/NewSummary';
import TableNumContext from './TableNumContext';
import CartContext from './CartContext';
import Opening from './Pages/Opening';
import Owner from './Pages/Owner';
import Login from './Pages/Login';
import Analysis from './Pages/Analysis'
import Registration from './Pages/Registration';
import EditMenu from './Pages/EditMenu';
import ChartPage from './Pages/ChartPage';


// import NewSummary from './Pages/NewSummary'
const App = () => {
  return (
    <>
    <CartContext>


    <TableNumContext>

       <BrowserRouter>
          <Routes>
              <Route path='/' element={<Opening/>}></Route>

              <Route path='/scanner' element={<Scanner/>} ></Route> 
                
              <Route path='/menu' element={<Menu/>} ></Route> 

              <Route path='/summary' element={<Summary/>} ></Route>  
              
              <Route path='/owner' element={<Owner/>}></Route>
              <Route path='/register' element={<Registration/>}></Route>
              <Route path='/login' element={<Login/>}></Route>
              <Route path='/analysis' element={<Analysis/>}></Route>
              <Route path='/editMenu' element={<EditMenu/>}></Route>
              <Route path='/chart' element={<ChartPage/>}></Route>
          </Routes>
       </BrowserRouter>    
    </TableNumContext>
    </CartContext>
      
    </>
  )
}
export default App;