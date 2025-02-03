const Panorama = require("../models/PanoramaModel");

const fs = require('fs');
const path = require("path")
const sharp = require("sharp")

function removeExt(name) {
    return name.slice(0, name.lastIndexOf("."));
}

async function getPanoramas(req, res) {
    const limit = req.query.limit;    
    const id = req.query.id;
    
    if(id) {
        return Panorama.find({_id: id}).then((result) => {
            return res.status(200).json(result)
        }).catch((e) => {
            return res.status(400).json({
                error: "Invalid ID"
            })
        })
    }

    try {
        Panorama
        .find()
        .limit(limit || 999)
        .then((result) => {
            return res.status(200).json(result)
        })
    }catch(e) {
        return res.status(500).json({
            error: "An error occured"
        })
    }
}

async function postPanorama(req, res) {    
    try {
        if(!req.files) {
            return res.status(400).json({
                error: "Invalid file"
            })
        }

        const image = req.files.image[0];
        const thumbnail = req.files.thumbnail[0];

        const DOWNLOAD_URL = `/${image.destination}/${image.filename}`;
        const PREVIEW_URL = `/${image.destination}/${removeExt(image.filename)}.webp`        

        const THUMBNAIL_URL_PNG = `/${thumbnail.destination}/${thumbnail.filename}`    
        const THUMBNAIL_URL_WEBP = `/${thumbnail.destination}/${removeExt(thumbnail.filename)}.webp`    

        const BASE_PATH = path.dirname(__dirname);

        sharp(BASE_PATH + DOWNLOAD_URL)
        .webp({quality: 50})
        .toFile(BASE_PATH + PREVIEW_URL, (err, info) => {            
            if(err) {
                console.log("Error converting Panorama, try again later");
            }else {
                console.log("Succes converting Panorama");
            }
        })

        // thumbnail
        sharp(BASE_PATH + THUMBNAIL_URL_PNG)
        .webp({quality: 50})
        .toFile(BASE_PATH + THUMBNAIL_URL_WEBP, (err, info) => {            
            if(err) {
                console.log("Error converting Thumbnail, try again later");
            }else {
                console.log("Succes converting Thumbnail");
                fs.unlinkSync(BASE_PATH + THUMBNAIL_URL_PNG);
                console.log("Removed PNG thumbnail");
            }
        })

        req.body.preview_url = PREVIEW_URL
        req.body.download_url = DOWNLOAD_URL
        req.body.thumbnail_url = THUMBNAIL_URL_WEBP

        req.body.size = `${image.size}`
        

        Panorama.create(req.body).then((result) => {
            return res.status(201).json(result);
        })
        .catch((e) => {
            return res.status(400).json({
                error: "Invalid"
            })
        })

    }catch(e) {
        console.log(e);
        
        return res.status(500).json({
            error: "Unexpected error"
        })
    } 
}

async function removePanorama(req, res) {    
    const id = req.query.id;
    
    try {
        try {
            const selectedPanorama = await Panorama.findOne({_id: id});
            const remove_path = path.dirname(__dirname) + selectedPanorama.url;
            
            Panorama.deleteOne({_id: id}).then((result) => {
                fs.unlinkSync(remove_path)

                return res.status(200).json({
                    message: "Panorama deleted succesfully"
                })
           })


        }catch(e) {
            return res.status(400).json({
                error: "Invalid Panorama ID"
            })
        }
    }catch(e) {        
        return res.status(500).json({
            error: "Unexpected error"
        })
    } 
}


module.exports = {
    getPanoramas,
    postPanorama,
    removePanorama
}