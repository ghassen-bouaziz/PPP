const jwt = require('jsonwebtoken');

exports.generateToken = (user) => {
    return jwt.sign({ user: { id: user.id } }, "jwt_token", { expiresIn: '1h' });
};

exports.verifyToken = (token) => {
    try {
        const decoded = jwt.verify(token, "jwt_token");
        return decoded.user;
    } catch (error) {
        return null;
    }
};
