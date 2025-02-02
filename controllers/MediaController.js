const Media = require("../models/MediaModel");

const fs = require('fs');
const path = require("path")

async function getMedia(req, res) {
    const limit = req.query.limit;    
    const category = req.query.category || "Images";    
    const id = req.query.id;
    
    if(id) {
        return Media.find({_id: id}).then((result) => {
            return res.status(200).json(result)
        }).catch((e) => {
            return res.status(400).json({
                error: "Invalid ID"
            })
        })
    }

    try {
        Media
        .find({category: category})
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

async function postMedia(req, res) {    
    try {
        if(!req.file) {
            return res.status(400).json({
                error: "Invalid file"
            })
        }

        req.body.url = `/${req.file.destination}/${req.file.filename}`
        req.body.size = `${req.file.size}`

        Media.create(req.body).then((result) => {
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

async function removeMedia(req, res) {    
    const id = req.query.id;
    
    try {
        try {
            const selectedMedia = await Media.findOne({_id: id});
            const remove_path = path.dirname(__dirname) + selectedMedia.url;
            
            Media.deleteOne({_id: id}).then((result) => {
                fs.unlinkSync(remove_path)

                return res.status(200).json({
                    message: "Media deleted succesfully"
                })
           })


        }catch(e) {
            return res.status(400).json({
                error: "Invalid media ID"
            })
        }
    }catch(e) {        
        return res.status(500).json({
            error: "Unexpected error"
        })
    } 
}


module.exports = {
    getMedia,
    postMedia,
    removeMedia
}