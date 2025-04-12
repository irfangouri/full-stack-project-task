const express = require('express');
const todoController = require('../controllers/todoController');

const todo = express.Router({ mergeParams: true });

todo.post('/', todoController.addTodo);
todo.get('/:todoId', todoController.getTodoById);
todo.get('/', todoController.getAllTodos);
todo.patch('/:todoId', todoController.updateTodoById);
todo.delete('/:todoId', todoController.deleteTodoById);

module.exports = todo;
