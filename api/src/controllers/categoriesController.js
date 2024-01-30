const Category = require('../models/Category');

// Récupérer toutes les catégories
exports.getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Ajouter une nouvelle catégorie
exports.addCategory = async (req, res) => {
    try {
        const { name } = req.body;

        const newCategory = new Category({ name });
        await newCategory.save();

        res.status(201).json(newCategory);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
