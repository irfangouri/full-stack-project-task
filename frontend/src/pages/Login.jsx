import React, { useState } from 'react';
import Button from '../components/button/button';
import './index.css';
import { useAuth } from '../contexts/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();

  const onClickHandler = () => {
    if (!email || !password) {
      return alert('Please fill all the fields');
    }
    login(email, password);
  };

  return (
    <div className='sign-up'>
      <p className='sign-up-header'>Login</p>
      <div className='input-component-div'>
        <label className='input-component-label'>Enter your email: </label>
        <input type='text' className='input-component' value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div className='input-component-div'>
        <label className='input-component-label'>Enter your password: </label>
        <input type='password' className='input-component' value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <Button title={'Login'} onClickHandler={onClickHandler} />
      <p className='sign-up-para'>Don't have an account? <a className='sign-up-anchor' onClick={() => window.location.href = '/signup'}>Signup</a></p>
    </div>
  );
}
