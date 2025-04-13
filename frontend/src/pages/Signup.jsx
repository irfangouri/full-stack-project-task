import React, { useState } from 'react';
import Button from '../components/button/button';
import './index.css';
import { useAuth } from '../contexts/AuthContext';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { signup } = useAuth();

  const onClickHandler = () => {
    signup(name, email, password, confirmPassword);
  };

  return (
    <div className='sign-up'>
      <p className='sign-up-header'>Signup</p>

      <div className='input-component-div'>
        <label className='input-component-label'>Name: </label>
        <input type='text' className='input-component' value={name} onChange={(e) => setName(e.target.value)} />
      </div>

      <div className='input-component-div'>
        <label className='input-component-label'>Email: </label>
        <input type='text' className='input-component' value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>

      <div className='input-component-div'>
        <label className='input-component-label'>Password: </label>
        <input type='password' className='input-component' value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>

      <div className='input-component-div'>
        <label className='input-component-label'>Confirm Password: </label>
        <input type='password' className='input-component' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
      </div>

      <Button title={'Signup'} onClickHandler={onClickHandler} />
      <p className='sign-up-para'>Already have an account? <a className='sign-up-anchor' onClick={() => window.location.href = '/login'}>Login</a></p>
    </div>
  );
}
