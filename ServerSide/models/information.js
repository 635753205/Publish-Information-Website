
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const informationSchema = new Schema({
    title: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: 'author', required: true },
    contents: { type: String, required: true },
    genre: { type: Schema.Types.ObjectId, ref: 'genre', required: true }
})

informationSchema.virtual('url')
    .get(function () {
        return `/catalog/information/${this._id}`
    })

module.exports = mongoose.model('information', informationSchema)