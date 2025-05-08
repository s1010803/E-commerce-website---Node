const express = require('express');
const router = express.Router();
const caroController = require('../controllers/carousel');

// GET /api/users
router.get('/', caroController.getAllCarousel);


module.exports = router;