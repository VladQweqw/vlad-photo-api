const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PanoramaSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    preview_url: {
        type: String,
        required: false,
    },
    thumbnail_url: {
        type: String,
        required: false,
    },
    size: {
        type: String,
        required: false,
    },
    download_url: {
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


const Panorama = mongoose.model('panoramas', PanoramaSchema)
module.exports = Panorama