const mongoose = require('mongoose')
const Schema = mongoose.Schema

const authorSchema = new Schema({
    first_name: { type: String, required: true, max: 100 },
    last_name: { type: String, required: true, max: 100 }
})

authorSchema.virtual('name')
    .get(() => {
        let fullName = ''
        if (this.first_name && this.last_name) {
            fullName = `${this.first_name} ${this.last_name}`
        }

        if (!this.first_name || !this.last_name) {
            fullName = ''
        }
        return fullName
    })

module.exports = mongoose.model('Author',authorSchema)