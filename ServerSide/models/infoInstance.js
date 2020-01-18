const mongoose = require('mongoose')

const Schema = mongoose.Schema

const infoInstanceSchema = new Schema({
    info: { type: Schema.Types.ObjectId, ref: 'info', required: true },
    imprint: { type: String, required: true },
})

infoInstanceSchema.virtual('url')
    .get(() => {
        return `/catalog/infoinstance/${this._id}`
    })

module.exports = mongoose.model('informationInstance', infoInstanceSchema)