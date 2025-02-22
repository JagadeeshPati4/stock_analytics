const express = require('express');
const { fetchTransactions } = require('../controllers/transactionsController');

const router = express.Router();

router.get('/', fetchTransactions);

module.exports = router;