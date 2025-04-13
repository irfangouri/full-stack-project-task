import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

const TodoContext = createContext();

export function useTodos() {
  return useContext(TodoContext);
}

export function TodoProvider({ children }) {
  const { auth } = useAuth();
  const [todos, setTodos] = useState([]);

  const fetchTodos = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/${auth.userId}/todo`, {
        headers: { Authorization: auth.token }
      });
      setTodos(res.data);
    } catch (err) {
      console.error('Failed to fetch todos:', err);
    }
  };

  const addTodo = async (todoData) => {
    try {
      await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/${auth.userId}/todo`, todoData, {
        headers: {
          Authorization: auth.token,
          'Content-Type': 'application/json'
        }
      });
      fetchTodos();
    } catch (err) {
      console.error('Failed to add todo:', err);
    }
  };

  useEffect(() => {
    if (auth?.userId && auth?.token) {
      fetchTodos();
    }
  }, [auth]);

  return (
    <TodoContext.Provider value={{ todos, fetchTodos, addTodo }}>
      {children}
    </TodoContext.Provider>
  );
}
