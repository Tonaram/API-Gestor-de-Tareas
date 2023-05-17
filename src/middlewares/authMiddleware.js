// src\middlewares\authMiddleware.js
const jwt = require('jsonwebtoken');
const User = require('./../models/user');
const dotenv = require('dotenv');

dotenv.config();

const jwtSecret = process.env.JWT_SECRET;

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, jwtSecret);
    const user = await User.findById(decodedToken.userId);

    if (!user) {
      throw new Error('User not found');
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Auth failed' });
  }
};

const adminMiddleware = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
      next();
    } else {
      res.status(403).json({ message: 'Forbidden' });
    }
};
  
module.exports = { authMiddleware, adminMiddleware };