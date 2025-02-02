const { Router } = require('express')
const router = Router();

const multer = require("multer");
const path = require("path");

const mediaController = require("../controllers/MediaController")

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/media");
    },
    filename: (req, file, cb) => {
        cb(null, "Media_" + new Date().getTime() + path.extname(file.originalname));
    }
})

const upload = multer({storage: storage})

//post
router.post('/', upload.single("media"), mediaController.postMedia);

//get
router.get('/', mediaController.getMedia);


module.exports = router;