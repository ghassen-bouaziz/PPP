const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const expensesRoutes = require('./routes/expensesRoutes');
const categoriesRoutes = require('./routes/categoriesRoutes');
const usersRoutes = require('./routes/usersRoutes');
const authMiddleware = require('./auth/authMiddleware');
// require('dotenv').config();

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.connect('mongodb+srv://test:test@cluster0.d1wsj.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });

// Configurer les routes
app.use('/expenses', expensesRoutes);
app.use('/categories', categoriesRoutes);
app.use('/users', usersRoutes);

app.listen(PORT, () => {
    console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});
