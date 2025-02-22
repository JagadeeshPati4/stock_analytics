const express = require('express');
const { getPieChartData } = require('../controllers/pieChartController');

const router = express.Router();

router.get('/', getPieChartData);

module.exports = router;