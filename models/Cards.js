const mongoose = require('mongoose')
const schema = mongoose.Schema({
    id: { type: Number, require: true },
    name: { type: String, require: true },
    price: { type: Number, require: true },
    createAt: { type: Date, require: true }
})

module.exports = mongoose.model('cards', schema)