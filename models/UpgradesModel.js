const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UpgradesSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: false,
    },
}, {
    timestamps: true
})


const Upgrades = mongoose.model('media', UpgradesSchema)
module.exports = Upgrades