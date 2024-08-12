const express=require('express')
const nodemailer = require('nodemailer');
const app=express();


const emailSender=(customer)=>
{

    let mailTransporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.eUSER,
            pass: process.env.ePASSWORD
        }
    });

    let mailDetails = {
        from: process.env.eUSER,
        to: customer.cemail,
        subject: 'Test mail',
        text: `             welcome in our restaurant


               ${customer.cname} your table number is ${customer.TableNum}

               Total billing INR ${customer.bill} 
               at ${customer.time} 
               `
    };

    mailTransporter.sendMail(mailDetails)
    .then((res)=>{
        console.log('email is send to',res.accepted);
    })
    .catch((err)=>{
        console.log(`error ${err}`);
    })
}


module.exports={emailSender}


 

