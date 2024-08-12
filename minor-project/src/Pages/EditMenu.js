import React, { useState } from 'react'
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
function EditMenu() {
  const [image,setImage]=useState('');
  const [details,setDetails]=useState({
    name:"",
    rate:"",
    qty:1,
    image:""
  })
  let options={
    method:'POST',
    headers:{
        'Content-Type': 'application/json'
    },
    body:JSON.stringify(details)
}
  
  const onSubmit= ()=>{
     const data=new FormData();
     data.append('file',image);
     data.append('upload_preset','orderProject');
     data.append('cloud_name','dribibm8y')

     fetch('https://api.cloudinary.com/v1_1/dribibm8y/image/upload',{
      method:'post',
      body:data
     })
     .then((res)=>res.json())
     .then((data)=>{
      console.log(data);
          setDetails({...details,image:data.secure_url})
          console.log(details);
     })
     .catch((err)=>console.log(err))
  }


  const uploadDish=async()=>{
  
        // onSubmit()
    
   const res=await fetch('/uploadDish',options)
   const data1=await res.json();
    console.log(data1);
    console.log(details);
 }

 const handleInput=(e)=>{
   const name=e.target.name;
   const value=e.target.value;


   setDetails({...details,[name]:value})
 }


 console.log(details);
  return (
    <>



<Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Nav>
        </Container>
      </Navbar>


      <Form>
      <Form.Group className="mb-3" controlId="formGroupEmail">
        <Form.Label>Dish Name</Form.Label>
        <Form.Control type="text" name='name' onChange={handleInput} placeholder="Enter Name" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formGroupPassword">
        <Form.Label>Dish Rate</Form.Label>
        <Form.Control type="text" name='rate' onChange={handleInput} placeholder="Enter Rate" />
      </Form.Group>
      
    </Form>
    <input type="file" name='image' onChange={(e)=>setImage(e.target.files[0])} />

    {/* <input type="file" name='image' onChange={(e)=>setDetails({...details,[name]}onSubmit(e.target.files[0]))} /> */}


    <button onClick={onSubmit} >Upload image</button>

    <button onClick={uploadDish} >Upload Dish</button>

    
    </>
  )
}

export default EditMenu;