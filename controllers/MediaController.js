const Media = require("../models/MediaModel");

async function getMedia(req, res) {
    const limit = req.query.limit;    
    const category = req.query.category || "Images";    

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

module.exports = {
    getMedia,
    postMedia,
}