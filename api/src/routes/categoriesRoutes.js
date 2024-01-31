const express = require('express');
const router = express.Router();
const categoriesController = require('../controllers/categoriesController');
const authMiddleware = require('../auth/authMiddleware');

// router.use(authMiddleware.authenticateUser);
// Get all categories
router.get('/',  categoriesController.getAllCategories);

router.get('/allWithExpenses', categoriesController.getAllCategoriesWithExpenses);

// Get a specific category by ID
router.get('/:id',  categoriesController.getCategoryById);

// Add a new category
router.post('/',  categoriesController.addCategory);

// Update a category by ID
router.put('/:id',  categoriesController.updateCategory);

// Delete a category by ID
router.delete('/:id',  categoriesController.deleteCategory);

module.exports = router;
