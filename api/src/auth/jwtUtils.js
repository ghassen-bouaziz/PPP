const jwt = require('jsonwebtoken');

// Générer un jeton JWT
exports.generateToken = (user) => {
    return jwt.sign({ user: { id: user.id } }, process.env.JWT_SECRET, { expiresIn: '1h' });
};
