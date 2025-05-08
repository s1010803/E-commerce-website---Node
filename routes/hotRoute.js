const express = require('express');
const router = express.Router();
const hotController = require('../controllers/hot');

router.get('/', hotController.getHot);

module.exports = router