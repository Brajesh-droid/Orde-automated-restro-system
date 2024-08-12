const jwt =require('jsonwebtoken')
const {userModel} =require('../DATABASE/dishSchema')
const authenticate=async (req,res,next)=>{
    
    console.log('entered in authenticate.js')
     try{
               const token=req.cookies.jwtoken;
               const verify=jwt.verify(token,process.env.SECRET_KEY)
            const rootUser=await userModel.findOne({_id:verify._id,'tokens.token':token})
               console.log(rootUser);


               if(!rootUser){
                throw new Error("user not found with following token")
               }

               req.token=token
               req.user=rootUser
               req.userId=verify._id
               next()
     }
     catch(err)
     {
        res.status(401).send('unauthorised: no token provided')
        console.log(err);
     }
}

module.exports=authenticate