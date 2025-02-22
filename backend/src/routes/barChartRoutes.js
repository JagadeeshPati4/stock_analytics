const express = require('express');
const { getBarChartData } = require('../controllers/barChartController');

const router = express.Router();

router.get('/', getBarChartData);

module.exports = router;