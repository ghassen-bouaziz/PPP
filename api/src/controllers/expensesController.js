const Expense = require('../models/Expense');
const Category = require('../models/Category');
const handleErrorResponse = require('../utils/handleErrorResponse');

const createExpense = async (req, res) => {
  try {
    const { amount, type, categoryName, categoryDescription, categoryImageUrl } = req.body;

    // Validation
    if (!amount || !type || !categoryName) {
      return res.status(400).json({ message: "Amount, type, and category name are required fields." });
    }

    // Check if the category already exists
    let category = await Category.findOne({ name: categoryName });

    // If the category doesn't exist, create a new one
    if (!category) {
      category = new Category({
        name: categoryName,
        description: categoryDescription || "",
        imageUrl: categoryImageUrl || "",
        type,
      });
      await category.save();
    }

    // Create a new expense with the provided category
    const expense = new Expense({
      amount,
      category: category._id,
      type,
    });

    const newExpense = await expense.save();
    res.status(201).json(newExpense);
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

const getAllExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find().populate('category');
    res.json(expenses);
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

const getExpenseById = async (req, res) => {
  try {
    const { id } = req.params;
    const expense = await Expense.findById(id).populate('category');

    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    res.json(expense);
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

const updateExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const { amount, category } = req.body;

    const updatedExpense = await Expense.findByIdAndUpdate(
      id,
      { amount, category },
      { new: true }
    ).populate('category');

    if (!updatedExpense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    res.json(updatedExpense);
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

const deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedExpense = await Expense.findByIdAndDelete(id);

    if (!deletedExpense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    res.json({ message: "Expense deleted successfully" });
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

module.exports = {
  createExpense,
  getAllExpenses,
  getExpenseById,
  updateExpense,
  deleteExpense,
};