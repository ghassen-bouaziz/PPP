const express = require('express');
const router = express.Router();
const expensesController = require('../controllers/expensesController');
const authMiddleware = require('../auth/authMiddleware');

// router.use(authMiddleware.authenticateUser);
// Get all expenses
router.get('/',expensesController.getAllExpenses);

// Get a specific expense by ID
router.get('/:id',expensesController.getExpenseById);

// Add a new expense
router.post('/',expensesController.addExpense);

// Update an expense by ID
router.put('/:id',expensesController.updateExpense);

// Delete an expense by ID
router.delete('/:id',expensesController.deleteExpense);

module.exports = router;
