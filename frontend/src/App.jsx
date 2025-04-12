import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';

const Signup = lazy(() => import('./pages/Signup.jsx'));
const Login = lazy(() => import('./pages/Login.jsx'));
const Home = lazy(() => import('./pages/Home.jsx'));

function App() {
  return (
    <Routes>
      <Route path='/signup' element={ <Suspense fallback={<div>Loading....</div>}> <Signup /> </Suspense> } />
      <Route path='/login' element={ <Suspense fallback={<div>Loading....</div>}> <Login /> </Suspense> } />
      <Route path='/' element={ <Suspense fallback={<div>Loading....</div>}> <Home /> </Suspense> } />
    </Routes>
  );
}

export default App;
