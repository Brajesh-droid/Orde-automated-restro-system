const mongoose=require('mongoose')


// const DB=process.env.DATABASE
const DB="mongodb://localhost:27017/minor-project"

mongoose.connect(DB)
.then(()=>{
    console.log('connected with database');
})
.catch((err)=>{
    console.log(err);
})