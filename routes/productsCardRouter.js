const express = require('express');
const router = express.Router();
const cardController = require('../controllers/productCard');

router.get('/', cardController.getProducts);

module.exports = router