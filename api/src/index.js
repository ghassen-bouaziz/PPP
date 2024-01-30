const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const expensesRoutes = require('./routes/expensesRoutes').default;
const categoriesRoutes = require('./routes/categoriesRoutes');
const usersRoutes = require('./routes/usersRoutes');
const { verifyToken, isAdmin } = require('./auth/authMiddleware');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
mongoose.connect('mongodb+srv://test:test@cluster0.d1wsj.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });

app.use('/expenses', verifyToken, expensesRoutes);
app.use('/categories', verifyToken, categoriesRoutes);
app.use('/users', usersRoutes);

// Other routes...

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
