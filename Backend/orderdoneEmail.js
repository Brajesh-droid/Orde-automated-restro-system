const express=require('express')
const nodemailer = require('nodemailer');
const app=express();


const orderdoneEmailSender=(customer)=>
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
        subject: 'Order is done',
        text: `             welcome in our restaurant


               ${customer.cname} your order is completed for table ${customer.TableNum}
               you can wait for waiter to bring it or can take it from counter.

               Thank you  
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


module.exports={orderdoneEmailSender}


 

