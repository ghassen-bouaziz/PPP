const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

// S'inscrire
router.post('/register', usersController.registerUser);

// Se connecter
router.post('/login', usersController.loginUser);

module.exports = router;
