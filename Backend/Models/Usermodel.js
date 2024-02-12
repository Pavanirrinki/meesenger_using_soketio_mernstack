const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    }
},{
    timestamps:true
})

const userschema = mongoose.model('User', usersSchema)
module.exports = userschema


