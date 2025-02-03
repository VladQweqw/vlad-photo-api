const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ImageScheme = new Schema({
    title: {
        type: String,
        required: true,
    },
    preview_url: {
        type: String,
        required: false,
    },
    thumbnail: {
        type: String,
        required: false,
    },
    download_url: {
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
})


const Image = mongoose.model('images', ImageScheme)
module.exports = Image