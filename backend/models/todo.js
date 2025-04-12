const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      index: true,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['in-progess', 'pending', 'completed'],
      default: 'pending',
    },
    createdBy: {
      type: String,
      index: true,
      required: true,
    },
    dueDate: {
      type: Date,
    },
    priority: {
      type: String,
      enum: ['low', 'medium', 'high'],
      default: 'medium',
    },
  },
  {
    timestamps: true,
  },
);

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;
