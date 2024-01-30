const User = require('../models/User');
const jwtUtils = require('../auth/jwtUtils');

// Inscription
exports.registerUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        const hashedPassword = bcrypt.hashSync(password, 10);
        const newUser = new User({ username, password: hashedPassword });

        await newUser.save();

        const token = jwtUtils.generateToken(newUser);
        res.status(201).json({ token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Connexion
exports.loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username });
        if (!user || !user.comparePassword(password)) {
            return res.status(401).json({ message: 'Nom d\'utilisateur ou mot de passe incorrect.' });
        }

        const token = jwtUtils.generateToken(user);
        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
