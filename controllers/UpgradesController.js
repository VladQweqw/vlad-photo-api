const Upgrade = require("../models/UpgradesModel");
const path = require("path");
const fs = require('fs');
const sharp = require("sharp")

function removeExt(name) {
    return name.slice(0, name.lastIndexOf("."));
}

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
        if(!req.file) {
            return res.status(400).json({
                error: "Invalid file"
            })
        }
        
        const UPGRADE_URL_PNG = `/${req.file.destination}/${req.file.filename}`;
        const UPGRADE_URL_WEBP = `/${req.file.destination}/${removeExt(req.file.filename)}.webp`;
        const BASE_PATH = path.dirname(__dirname);
        
        sharp(BASE_PATH + UPGRADE_URL_PNG)
        .webp({quality: 50})
        .toFile(BASE_PATH + UPGRADE_URL_WEBP, (err, info) => {                        
            if(err) {
                console.log("Error converting image, try again later");
            }else {                        
                console.log("Succes converting image");
            }
        })

        req.body.image_url = UPGRADE_URL_WEBP;

        Upgrade.create(req.body).then((result) => {
            return res.status(201).json(result);
        }).catch((e) => {
            return res.status(400).json({
                error: "Invalid data"
            })
        })
    
    }catch(e) {
        console.log(e);
        
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