const mongoose = require('mongoose')
const Schema = mongoose.Schema

const authorSchema = new Schema({
    first_name: { type: String, required: true, max: 100 },
    last_name: { type: String, required: true, max: 100 }
})

authorSchema.virtual('name')
    .get(function(){
        let fullName = ''
        if (this.first_name && this.last_name) {
            fullName = `${this.last_name}${this.first_name}`
        }

        if (!this.first_name || !this.last_name) {
            fullName = ''
        }
        return fullName
    })

authorSchema.virtual('url')
.get(function(){
    return `/catalog/author/${this._id}`
})

module.exports = mongoose.model('author',authorSchema)