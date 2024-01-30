const express = require('express');
const router = express.Router();
const categoriesController = require('../controllers/categoriesController');
const authMiddleware = require('../auth/authMiddleware');

// Récupérer toutes les catégories
router.get('/', authMiddleware.authenticateUser, categoriesController.getAllCategories);

// Ajouter une nouvelle catégorie
router.post('/', authMiddleware.authenticateUser, categoriesController.addCategory);

module.exports = router;
