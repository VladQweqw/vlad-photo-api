const { Router } = require('express')
const router = Router();

const multer = require("multer");
const path = require("path");

const ImageController = require("../controllers/ImageController")

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/images");
    },
    filename: (req, file, cb) => {
        cb(null, "Image_" + new Date().getTime() + path.extname(file.originalname));
    }
})

const upload = multer({storage: storage})

//post
router.post('/', upload.single("image"), ImageController.postImage);

//get
router.get('/', ImageController.getImage);

//delete
router.delete('/', ImageController.removeImage);



module.exports = router;