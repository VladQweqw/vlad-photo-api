const Upgrade = require("../models/UpgradesModel");
const mongoose = require("mongoose")

async function getUpgrades(req, res) {
    try {
        Upgrade.find().then((result) => {
            return res.status(200).json(result);
        })
    }catch(e) {
        return res.status(500).json({
            error: "Unexpected error"
        })
    }
}


async function postUpgrade(req, res) {

    try {
        Upgrade.create(req.body).then((result) => {
            return res.status(201).json(result);
        })
    }catch(e) {
        return res.status(500).json({
            error: "Unexpected error"
        })
    }
}

async function removeUpgrade(req, res) {
    const id = req.query.id;

    try {
        Upgrade.deleteOne({_id: id}).then((result) => {
            return res.status(200).json({
                message: "Upgrade deleted succesfully"
            });
        })
    }catch(e) {
        return res.status(500).json({
            error: "Invalid Upgrade ID"
        })
    }
}


module.exports = {
    getUpgrades,
    postUpgrade,
    removeUpgrade
}