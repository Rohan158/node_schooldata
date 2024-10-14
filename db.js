const mongoose =require('mongoose');
// require('dotenv').config();
const mongoURL='mongodb://localhost:27017/School';

mongoose.connect(mongoURL,{
    useNewUrlParser: true,
    useUnifiedTopology:true
})

const db=mongoose.connection;

db.on('connected',()=>{
    console.log("connected")
})

db.on('error',(err)=>{
    console.log("found error",err);
})

db.on('disconnected',()=>{
    console.log("dis-connected")
})

module.exports=db;