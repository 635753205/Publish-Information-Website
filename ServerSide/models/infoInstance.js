
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const infoInstanceSchema = new Schema({

    information: { type: Schema.Types.ObjectId, ref: 'information', required: true },
    imprint: { type: String, required: true },

})
infoInstanceSchema.virtual('url')
    .get(function () {
        return `/catalog/informationinstance/${this._id}`
    })


module.exports = mongoose.model('informationInstance', infoInstanceSchema)