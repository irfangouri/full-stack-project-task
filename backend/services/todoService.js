const Todo = require('../models/todo');
const { validateTodo } = require('../validations/todoValidation');

const addTodo = async (todoData, userId) => {
  const todoValidation = validateTodo(todoData, userId);
  if (todoValidation?.error) {
    return {
      error: todoValidation.error,
    };
  }

  const todo = new Todo({
    title: todoData.title,
    description: todoData.description,
    status: todoData.status,
    createdBy: userId,
    dueDate: todoData.dueDate,
    priority: todoData.priority,
  });

  await todo.save();
  return todo;
}

const getTodoById = async (todoId) => {
  const todo = await Todo.findById(todoId);
  if (!todo) {
    return {
      error: 'Todo not found',
    };
  }

  return todo;
}

const getAllTodos = async (userId) => {
  const todos = await Todo.find({ createdBy: userId });
  return todos;
}

const updateTodoById = async (todoId, todoData) => {
  let { status, priority, dueDate } = todoData;

  const todo = await Todo.findById(todoId);
  if (!todo) {
    return {
      error: 'Todo not found',
    };
  }

  if (!status) {
    status = todo.status;
  }

  if (!priority) {
    priority = todo.priority;
  }

  if (!dueDate) {
    dueDate: todo.dueDate;
  }

  const updatedTodo = await Todo.findByIdAndUpdate(
    todoId,
    { status, priority, dueDate },
    { new: true },
  );

  return updatedTodo;
}

const deleteTodoById = async (todoId) => {
  const todo = await Todo.findByIdAndDelete(todoId);
  if (!todo) {
    return {
      error: 'Todo not found',
    };
  }

  return todo;
}

module.exports = {
  addTodo,
  getTodoById,
  getAllTodos,
  updateTodoById,
  deleteTodoById,
};
