const { Router } = require('express')
const router = Router();

const multer = require("multer");
const path = require("path");

const UpgradesController = require("../controllers/UpgradesController")

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/upgrades");
    },
    filename: (req, file, cb) => {

    
        cb(null, "Upgrade_" + new Date().getTime() + path.extname(file.originalname)); 
    }
})

const upload = multer({storage: storage})

router.post('/', upload.single("image"), UpgradesController.postUpgrade);
router.get('/', UpgradesController.getUpgrades);


router.delete('/', UpgradesController.removeUpgrade);


module.exports = router;