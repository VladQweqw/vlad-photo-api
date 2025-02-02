const { Router } = require('express')
const router = Router();

const UpgradesController = require("../controllers/UpgradesController")

router.get('/', UpgradesController.getUpgrades);

router.post('/', UpgradesController.postUpgrade);

router.delete('/', UpgradesController.removeUpgrade);


module.exports = router;