const Category = require("../models/Category");
const Expense = require("../models/Expense");

// Get all categories
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a specific category by ID
exports.getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add a new category
exports.addCategory = async (req, res) => {
  try {
    const {
      name,
      type,
      description,
      //  imageUrl
    } = req.body;

    const newCategory = new Category({
      name,
      type,
      description,
      imageUrl:
        "https://uxwing.com/wp-content/themes/uxwing/download/arts-graphic-shapes/star-icon.png",
    });
    await newCategory.save();

    res.status(201).json(newCategory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a category by ID
exports.updateCategory = async (req, res) => {
  try {
    const { name, type, description, imageUrl } = req.body;

    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.id,
      { name, type, description, imageUrl },
      { new: true }
    );

    if (!updatedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.json(updatedCategory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a category by ID
exports.deleteCategory = async (req, res) => {
  try {
    const deletedCategory = await Category.findByIdAndDelete(req.params.id);

    if (!deletedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllCategoriesWithExpenses = async (req, res) => {
  try {
      const categories = await Category.find();

      // Fetch total expenses for each category
      const categoriesWithExpenses = await Promise.all(
          categories.map(async (category) => {
              const expenses = await Expense.find({ category: category._id });
              const totalSum = expenses.reduce((sum, expense) => sum + expense.amount, 0);

              // Calculate percentage
              const totalExpenses = await Expense.aggregate([
                  {
                      $group: {
                          _id: null,
                          total: { $sum: '$amount' },
                      },
                  },
              ]);

              const percentage = totalExpenses.length > 0
                  ? (totalSum / totalExpenses[0].total) * 100
                  : 0;

              return {
                  category,
                  totalSum,
                  percentage,
              };
          })
      );

      res.json(categoriesWithExpenses);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};
