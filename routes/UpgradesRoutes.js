const { Router } = require('express')
const router = Router();

const UpgradesController = require("../controllers/UpgradesController")

router.get('/', UpgradesController.getUpgrades);


module.exports = router;