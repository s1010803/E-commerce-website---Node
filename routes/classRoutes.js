const express = require('express');
const router = express.Router();
const classController = require('../controllers/select');

// GET /api/users
router.get('/', classController.getAllClass);

// GET /api/users/:id
router.get('/:id', classController.getProductById);

module.exports = router;