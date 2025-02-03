const { Router } = require('express')
const router = Router();

const multer = require("multer");
const path = require("path");

const PanoramaController = require("../controllers/PanoramaController")

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/panoramas");
    },
    filename: (req, file, cb) => {
        let name = "Panorama_"
        if(file.fieldname == "thumbnail") {
            name = "Thumbnail_"
        }
    

        cb(null, name + new Date().getTime() + path.extname(file.originalname));
        
    }
})

const upload = multer({storage: storage})

//post
router.post('/', upload.fields([
    {name: "thumbnail", maxCount: 1},
    {name: "image", maxCount: 1},
]), PanoramaController.postPanorama);

//get
router.get('/', PanoramaController.getPanoramas);

//delete
router.delete('/', PanoramaController.removePanorama);



module.exports = router;