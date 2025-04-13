import React, { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

import { AuthProvider } from './contexts/AuthContext.jsx';
import { TodoProvider } from './contexts/TodoContext.jsx';
import { WeatherProvider } from './contexts/WeatherContext.jsx';

const Signup = lazy(() => import('./pages/Signup.jsx'));
const Login = lazy(() => import('./pages/Login.jsx'));
const Dashboard = lazy(() => import('./pages/Dashboard.jsx'));

function App() {
  return (
    <AuthProvider>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />

          <Route
            path='/dashboard'
            element={
              <TodoProvider>
                <WeatherProvider>
                  <Dashboard />
                </WeatherProvider>
              </TodoProvider>
            }
          />

          <Route path='/' element={<Navigate to="/dashboard" />} />
          <Route path='*' element={<Navigate to="/dashboard" />} />
        </Routes>
      </Suspense>
    </AuthProvider>
  );
}

export default App;
