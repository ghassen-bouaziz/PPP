const jwtUtils = require('../auth/jwtUtils');

exports.authenticateUser = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized. Token missing.' });
    }

    const user = jwtUtils.verifyToken(token.replace('Bearer ', ''));

    if (!user) {
        return res.status(401).json({ message: 'Unauthorized. Invalid token.' });
    }

    req.user = user;
    next();
};
