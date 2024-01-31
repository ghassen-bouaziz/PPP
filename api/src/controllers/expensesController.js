const Expense = require('../models/Expense');
const Category = require('../models/Category');

// Get all expenses
exports.getAllExpenses = async (req, res) => {
    try {
        const expenses = await Expense.find().populate('category');
        res.json(expenses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a specific expense by ID
exports.getExpenseById = async (req, res) => {
    try {
        const expense = await Expense.findById(req.params.id).populate('category');
        if (!expense) {
            return res.status(404).json({ message: 'Expense not found' });
        }
        res.json(expense);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.addExpense = async (req, res) => {
    try {
        const { amount, categoryId, date, description } = req.body;

        // Check if the category exists
        const category = await Category.findById(categoryId);
        if (!category) {
            return res.status(400).json({ message: 'The specified category does not exist.' });
        }

        // Determine the sign based on the category type
        const sign = category?.type === '+' ? 1 : -1;

        const newExpense = new Expense({
            amount: amount * sign,
            category: categoryId,
            date,
            description,
        });

        await newExpense.save();

        res.status(201).json(newExpense);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update an expense by ID
exports.updateExpense = async (req, res) => {
    try {
        const { amount, category, date, description } = req.body;

        // Check if the category exists
        const existingCategory = await Category.findById(category);
        if (!existingCategory) {
            return res.status(400).json({ message: 'The specified category does not exist.' });
        }

        const updatedExpense = await Expense.findByIdAndUpdate(
            req.params.id,
            { amount, category, date, description },
            { new: true }
        );

        if (!updatedExpense) {
            return res.status(404).json({ message: 'Expense not found' });
        }

        res.json(updatedExpense);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete an expense by ID
exports.deleteExpense = async (req, res) => {
    try {
        const deletedExpense = await Expense.findByIdAndDelete(req.params.id);

        if (!deletedExpense) {
            return res.status(404).json({ message: 'Expense not found' });
        }

        res.json({ message: 'Expense deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
