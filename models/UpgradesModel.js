const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UpgradesSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    date: {
        type: Number,
        required: false,
    },
}, {
    timestamps: true
})


const Upgrades = mongoose.model('upgrades', UpgradesSchema)
module.exports = Upgrades