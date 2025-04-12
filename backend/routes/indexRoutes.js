const express = require('express');

const userRoutes = require('./userRoutes');
const todoRoutes = require('./todoRoutes');

const { authMiddleware } = require('../middlewares/authMiddleware');

const router = express.Router();

// Centralizing all the routes in one file
router.use('/user', userRoutes);
router.use('/:userId/todo', authMiddleware, todoRoutes);

module.exports = router;
