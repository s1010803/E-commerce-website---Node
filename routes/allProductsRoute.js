const express = require('express');
const router = express.Router();
const productsController = require('../controllers/allProducts')

router.get('/', productsController.getAllProducts)

module.exports = router