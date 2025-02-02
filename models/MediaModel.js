const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MediaScheme = new Schema({
    title: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: false,
    },
    size: {
        type: String,
        required: false,
    },
    device: {
        type: String,
    },
    country: {
        type: String, 
    },
    county: {
        type: String,
    },
    date: {
        type: Number,
    },
    category: {
        type: String,
        required: true
    },
})


const Media = mongoose.model('media', MediaScheme)
module.exports = Media