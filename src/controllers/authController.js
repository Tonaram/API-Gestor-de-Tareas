// src\controllers\authController.js
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const jwtSecret = process.env.JWT_SECRET;

exports.login = async (req, res) => {
    const { email, contraseña } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (user.contraseña !== contraseña) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        const token = jwt.sign({ userId: user._id, role: user.role }, jwtSecret, { expiresIn: '1h' });

        res.status(200).json({ token, userId: user._id, role: user.role });
    } catch (error) {
        console.error('Error in login:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.googleAuth = async (req, res) => {
    const token = jwt.sign({ userId: req.user._id, role: req.user.role }, jwtSecret, { expiresIn: '1h' });
  
    res.redirect(`http://localhost:4200/login?token=${token}`);
  };