const express = require('express');
const router = express.Router();
const productDetailController = require('../controllers/productDetail');

router.get('/:id', productDetailController.getProductDetail)

module.exports = router