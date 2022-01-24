const express = require('express');
const router = express.Router();

const temperatureCtrl = require('../controllers/temperature');

router.get('/', temperatureCtrl.getAllTemperature);
router.get('/:userId',temperatureCtrl.getUserTemperature);
router.post('/',temperatureCtrl.createTemperature);

module.exports = router;