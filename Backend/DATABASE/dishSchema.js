const mongoose=require('mongoose')
const bcrypt=require('bcryptjs')
const {emailSender} =require('../Email')
const jwt = require('jsonwebtoken')
const dishSchema=new mongoose.Schema({
    name:String,
    rate:String,
    image:String,
    qty:Number
})

const chartDataSchema=new mongoose.Schema({
    name:String,
    qty:Number
})
const orderSchema=new mongoose.Schema({
    cname:String,
    cemail:String,
    TableNum:String,
    order:[],
    bill:Number,
    date:String,
    time:String
})


const userSchema=new mongoose.Schema({
    name:{
        type:String,
    },
    email:{
        type:String,
    },
    password:{
        type:String,
    },
    tokens:[
        {
            token:String
        }
    ]

})

orderSchema.post('save',async function(next){
    emailSender(this)
    // next()
})

userSchema.methods.generateAuth=async function(){
    try{

        let token=await jwt.sign({_id:this._id},process.env.SECRET_KEY)
        this.tokens=this.tokens.concat({token:token})
        await this.save()
        return token
    } 
    catch(err)
    {
        console.log(`error at auth method ${err}`);
    }
}
userSchema.pre('save',async function(next){

    if(this.isModified('password'))
    {
        this.password= await bcrypt.hash(this.password,12);
    }
    next()
});

const dishModel=mongoose.model('Dish',dishSchema);
const orderModel=mongoose.model('order',orderSchema);
const userModel=mongoose.model('User',userSchema)
const chartModel=mongoose.model('chartData',chartDataSchema)
module.exports={dishModel,orderModel,userModel,chartModel}
