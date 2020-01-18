
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const infoSchema = new Schema({
    title:{type:String,required:true},
    author:{type:Schema.Types.ObjectId,ref:'author',required:true},
    contents:{type:String}
})

infoSchema.virtual('url')
.get(() => {
    return `/catalog/info/${this._id}`
})

module.exports = mongoose.model('information',infoSchema)