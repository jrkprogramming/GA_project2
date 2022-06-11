const mongoose = require('mongoose')

const imageSchema = mongoose.Schema({
    image:{
        data:Buffer,
        conentType: String
    }
})

module.exports = mongoose.model('Images', imageSchema)