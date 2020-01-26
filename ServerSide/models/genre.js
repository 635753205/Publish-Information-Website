const mongoose = require('mongoose')
const Schema = mongoose.Schema

const genreSchema = new Schema({
    name: { type: String, required: true, max: 100 }
})

genreSchema.virtual('genre_name')
    .get(function (err) {
        if (this.name) {
            return this.name
        }
        if (!this.name) {
            return
        }
    })

genreSchema.virtual('url')
.get(function(){
    console.log(this._id);
    return `/catalog/genre/${this._id}`
})
module.exports = mongoose.model('genre', genreSchema)