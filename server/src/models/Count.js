const mongoose = require('mongoose')

const countSchema = new mongoose.Schema({
    id: { type: String , required: true , unique: true} ,
    value: { type: Number }
})

module.exports = mongoose.model('Count' , countSchema)