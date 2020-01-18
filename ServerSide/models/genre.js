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
module.exports = mongoose.model('Genre', genreSchema)