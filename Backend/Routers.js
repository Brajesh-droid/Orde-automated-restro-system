const express =require('express')
const {orderModel} =require('./DATABASE/dishSchema')
const {userModel}=require('./DATABASE/dishSchema')
const {dishModel}=require('./DATABASE/dishSchema')
const {chartModel}=require('./DATABASE/dishSchema')
const bcrypt=require('bcryptjs')
const Router=express.Router();
const {emailSender}=require('./Email');
const authenticate = require('./Middleware/authenticate');
const jsonc = require('jsonc');
const { orderdoneEmailSender } = require('./orderdoneEmail');
require('./DATABASE/dbConnection')

Router.post('/payment',async (req,res)=>{
    const {cname,cemail,TableNum,order,bill,date,time}=req.body;
  // checking if cart is empty of not
    try {
        
        if(order.length>0)
        {
            const userOrder=new orderModel(req.body) 
            await userOrder.save()


             order.map(async (val)=>{
                try {
                const found =await chartModel.findOne({name:val.name})
                if(found)
                {
                    await chartModel.updateOne({name:val.name},{$inc:{qty:val.qty}})
                }else{
                    const newChartData=new chartModel({name:val.name,qty:val.qty});
                    await newChartData.save()
                    console.log('data is saved for analysis');
                }
                } catch (error) {
                    console.log('error in payment method',error);
                }
            })
            // .then(()=>{
            //     console.log('order saved');
            // })
            // .catch((err)=>{
            //     console.log(err);
            // })
            res.send({message:"order is placed"})
        }
        else{
            res.send({message:"please fill the cart first"})
        }
    } catch (error) {
        console.log(error);
        
    }
})


Router.post('/orderisdone', async(req,res)=>{
    try{
        console.log(req.body);
        orderdoneEmailSender(req.body)
        await orderModel.findByIdAndDelete(req.body._id)
        res.send({message:'order is done'})
    }
    catch(err)
    {
        console.log(err);
        res.send(err)
    }
})

Router.post('/register',async (req,res)=>{
    const {name,email,password}=req.body;

    try{

        const isPresent=await userModel.findOne({email:email})
        
        if(isPresent)
        {
            res.status(404).send({message:'user already registered'})
            console.log('user already registered');
        }else{
            const user=new userModel(req.body);
            await user.save();
            res.status(200).send({message:'user is registered'})
            // console.log('user registered');
        }
    }catch(err)
    {
        res.status(404).send({error:"some error occured"})
    }

})



Router.post('/uploadDish',async (req,res)=>{


    console.log('on upload dish');
    console.log(req.body);
    const {name,rate,rating,image}=req.body;

    try {
        const isPresent= await dishModel.findOne({name:name});
        console.log(isPresent);
        if(isPresent)
        {
            res.status(404).send({message:'Dish is already present'});
        }
        else{
            const dish=new dishModel(req.body);
            await dish.save();
            res.status(200).send({message:'dish is uploaded'})
        }
    } catch (error) {
        console.log(error);
        res.status(404).send({error:"error on uploading dish"})
    }
})


Router.post('/login',async (req,res)=>{
   
    try{

    const {email,password}=req.body;
    if(!email || !password)
    {
        return res.status(400).send({error:"please fill the data"})
    }
        const user=await userModel.findOne({email:email})
        if(user){
            const isMatch=await bcrypt.compare(password,user.password);
            const token=await user.generateAuth();
            if(isMatch)
            {
                res.cookie('jwtoken',token,{
                    httpOnly:true
                })
                console.log(token);
                console.log(user.name," logined successful");
                res.status(200).send({message:"user logined"})
            }else
            {
                console.log('wrong credentials');
                res.status(404).send({message:"wrong credentials"})
            }
        }
        else
        {
            console.log('no account for that email');
            res.status(404).send({message:"user with this emai is not found"})
        }
    }
    catch(err)
    {
           res.status(404).send({error:err})
    }


})

Router.get('/getDishList',async (req,res)=>{
    try {
    

        const list=await dishModel.find()
        if(list.length===0)
        {
         console.log('no dishes today')
        }
        console.log(list);
         res.send(list);
    } catch (error) {
        console.log(error);
        res.send(error)
    }
})

Router.get('/analysis',authenticate,(req,res)=>{
    console.log('auth entered');
//    const data= jsonc.stringify(req.user);
    // console.log(req.user);
    res.send(req.user)
})

Router.get('/getChartdata',async(req,res)=>{
    try {
        const list=await chartModel.find();
        res.send(list);
    } catch (error) {
        console.log(error);
        res.send(error)
    }
})

Router.get('/getOrderList',async (req,res)=>{
    console.log('entered get order list');
    console.log(req.query.date);
   try {
    

       const list=await orderModel.find({date:req.query.date})
       if(list.length===0)
       {
        console.log('no order today')
       }
       console.log(list);
        res.send(list);
   } catch (error) {
       console.log(error);
       res.send(error)
   }
})



module.exports=Router