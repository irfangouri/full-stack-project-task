const express = require('express');
const userController = require('../controllers/userController');
const { authMiddleware } = require('../middlewares/authMiddleware');

const user = express.Router({ mergeParams: true });

user.post('/', userController.registerUser);
user.post('/access-token', userController.loginUser);
user.get('/:userId', userController.getUser);

module.exports = user;
