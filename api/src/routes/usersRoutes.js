const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

// Define routes for managing users
router.post('/register', usersController.createUser);
router.post('/login', usersController.loginUser);

module.exports = router;
