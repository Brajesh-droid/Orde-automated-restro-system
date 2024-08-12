import React, { useEffect, useState } from 'react'
import { useNavigate} from 'react-router';
import { NavLink } from 'react-router-dom'
import './Analysis.css'
function Analysis() {
    const [date, setDate] = useState();
    const [TableList, setTableList] = useState([]);
    const [orderList, setOrderList] = useState([]);
    const [deleteCnt,setDeletecnt]=useState(0);
    const [table,setTable]=useState();
    const navigate = useNavigate();

    const orderDone=async(customer)=>{
        try {
            const res=await fetch('/orderisdone',{
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(customer),
                })

            const data=await res.json();
            console.log(data);
            window.alert(data.message)
            setDeletecnt((prev)=>prev+1)
        } catch (error) {
            console.log(error);
        }
    }
    const callAnalysisPage = async () => {
        try {
            const res = await fetch('/analysis', {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-type': 'application/json',
                    credentials: 'include'
                }
            });

            const data = await res.json();
            // console.log(data);

            if (res.status !== 200) {
                const err = new Error(res.error)
                throw err;
            }


        } catch (error) {
            console.log(error);
            navigate('/login')
        }
    }

    function formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        return [year, month, day].join('-');
    }
    function getdate() {
        let today = new Date();
        const obj = formatDate(today)

        return obj
    }

    const getOrderList = async () => {
        try {
            const url = '/getOrderList?' + new URLSearchParams({ date: date }).toString();
            const res = await fetch(url)
            const data = await res.json();
            console.log(data);
            setTableList(data);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {



        console.log(date);


        callAnalysisPage();

        getOrderList();

    },[date,deleteCnt])



    return (
        <>
            <div className="analysis-root">



                <div className="input-date">

                    <h1 className='head'>Kitchen</h1>

                    <div className='input-edit'>

                        <div>Select day</div>
                        <input type="date" placeholder='Select day' onChange={(e) => setDate(e.target.value)} />


                        <NavLink to='/chart' className="edit-btn">
                            check analysis
                        </NavLink>
                        <NavLink to='/editMenu' className="edit-btn">
                            Edit Menu
                        </NavLink>
                        <span>Table:{table}</span>
                    </div>
                </div>

                <div className='main'>

                    <div className="table-list">


                        {TableList.length > 0 && TableList.map((val, key) => {
                            return (
                                <div className='list' onClick={() => {
                                    setOrderList(val.order)
                                    setTable(val.TableNum)
                                }} >

                                    <h2>
                                        {val.TableNum}
                                    </h2>
                                    <button className='button' onClick={()=>orderDone(val)} >
                                        
                                        Done
                                    </button>
                                </div>
                            )
                        })}
                    </div>

                    <div className="order-description">
                        <div className="table-desc">
                            <span>Name</span>
                            
                            <span>Quantity</span>
                            
                        </div>
                        <div className="order-list">

                            {orderList.length > 0 && orderList.map((val, key) => {
                                return <div className='desc-list'>
                                    <span>{val.name}</span>
                                    <span>{val.id}</span>
                                    <span>{val.qty}</span>
                                </div>
                            })}
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Analysis