import { Router } from 'express';
const router = Router();
import { createExpense, getAllExpenses, getExpenseById, updateExpense, deleteExpense } from '../controllers/expensesController';
import verifyToken from '../auth/authMiddleware';

router.post('/', verifyToken, createExpense);
router.get('/', verifyToken, getAllExpenses);
router.get('/:id', verifyToken, getExpenseById);
router.put('/:id', verifyToken, updateExpense);
router.delete('/:id', verifyToken, deleteExpense);

export default router;
