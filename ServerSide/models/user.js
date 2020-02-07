const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    user_name:{type:String,required:true,max:10},
    password:{type:String,required:true,max:10},
})
