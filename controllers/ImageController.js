const Image = require("../models/ImageModel");

const fs = require('fs');
const path = require("path")
const sharp = require("sharp")

function removeExt(name) {
    return name.slice(0, name.lastIndexOf("."));
}

async function getImage(req, res) {
    const limit = req.query.limit;    
    const id = req.query.id;
    
    if(id) {
        return Image.find({_id: id}).then((result) => {
            return res.status(200).json(result)
        }).catch((e) => {
            return res.status(400).json({
                error: "Invalid ID"
            })
        })
    }

    try {
        Image
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

async function postImage(req, res) {    
    try {
        if(!req.file) {
            return res.status(400).json({
                error: "Invalid file"
            })
        }

        const DOWNLOAD_URL = `/${req.file.destination}/${req.file.filename}`;
        const PREVIEW_URL = `/${req.file.destination}/${removeExt(req.file.filename)}.webp`        
        const BASE_PATH = path.dirname(__dirname);

        sharp(BASE_PATH + DOWNLOAD_URL)
        .webp({quality: 50})
        .toFile(BASE_PATH + PREVIEW_URL, (err, info) => {            
            if(err) {
                console.log("Error converting image, try again later");
            }else {
                console.log("Succes converting image");
            }
        })

        req.body.preview_url = PREVIEW_URL
        req.body.download_url = DOWNLOAD_URL

        req.body.size = `${req.file.size}`
        

        Image.create(req.body).then((result) => {
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

async function removeImage(req, res) {    
    const id = req.query.id;
    
    try {
        try {
            const selectedImage = await Image.findOne({_id: id});
            const remove_path = path.dirname(__dirname) + selectedImage.url;
            
            Image.deleteOne({_id: id}).then((result) => {
                fs.unlinkSync(remove_path)

                return res.status(200).json({
                    message: "Image deleted succesfully"
                })
           })


        }catch(e) {
            return res.status(400).json({
                error: "Invalid Image ID"
            })
        }
    }catch(e) {        
        return res.status(500).json({
            error: "Unexpected error"
        })
    } 
}


module.exports = {
    getImage,
    postImage,
    removeImage
}