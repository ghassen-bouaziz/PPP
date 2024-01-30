const express = require('express');
const router = express.Router();
const expensesController = require('../controllers/expensesController');
const authMiddleware = require('../auth/authMiddleware');

// Récupérer toutes les dépenses
router.get('/', authMiddleware.authenticateUser, expensesController.getAllExpenses);

// Ajouter une nouvelle dépense
router.post('/', authMiddleware.authenticateUser, expensesController.addExpense);

module.exports = router;
