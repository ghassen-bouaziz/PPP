const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware pour vérifier l'authentification
exports.authenticateUser = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: 'Accès non autorisé. Token manquant.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Token invalide.' });
    }
};
