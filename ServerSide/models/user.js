const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userSchema = new Schema({
    name:{type:String,required:true},
    password:{type:String,required:true},
    email:{type:String,required:true},
    login:{type:Boolean,required:true},
})

module.exports = mongoose.model("user",userSchema)