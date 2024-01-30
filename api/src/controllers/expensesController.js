const Expense = require('../models/Expense');
const Category = require('../models/Category');

// Récupérer toutes les dépenses
exports.getAllExpenses = async (req, res) => {
    try {
        const expenses = await Expense.find().populate('category');
        res.json(expenses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Ajouter une nouvelle dépense
exports.addExpense = async (req, res) => {
    try {
        const { amount, category } = req.body;

        // Vérifier si la catégorie existe
        const existingCategory = await Category.findById(category);
        if (!existingCategory) {
            return res.status(400).json({ message: 'La catégorie spécifiée n\'existe pas.' });
        }

        const newExpense = new Expense({ amount, category });
        await newExpense.save();

        res.status(201).json(newExpense);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
