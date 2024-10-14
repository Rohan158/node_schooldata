const mongoose=require('mongoose')

const personSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true

    },
    
    work:{
        type:String,
        enum:['teacher','student'],
        required:true
    },
    
    email:{
        type:String,
        required:true,
        unique:true
    },
   
    gender:{
        type:String,
        enum:['male','female'],
        required:true
    },

    // username:{
    //     required:true,
    //     type:String
    // },
    
    // password:{
    //     required:true,
    //     type:String
    // }
})
//create the model of schema
const School=mongoose.model('School',personSchema)
module.exports=School;