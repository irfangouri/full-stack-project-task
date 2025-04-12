import React, { useState } from 'react';
import axios from 'axios';
import Button from '../components/button/button';
import './index.css';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const onClickHandler = async () => {
    try {
      if (!email || !password) {
        return alert('Please fill all the fields');
      }

      const response = await axios.post(`http://localhost:4040/api/user`, {
        username: email,
        password,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      alert(`User ${response.data.username} registered successfully, uniqueId is ${response.data.id}`);
      setEmail('');
      setPassword('');
      navigate('/login');
    } catch (err) {
      console.error('Error occurred while registering user, Please try again later. Error: ', err.response);
      alert(`Error: ${err.response.data}`);
    }
  }

  return (
    <div className='sign-up'>
      <p className='sign-up-header'>Signup</p>
      <div className='input-component-div'>
        <label className='input-component-label'>Enter your email: </label>
        <input type='text' className='input-component' value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div className='input-component-div'>
        <label className='input-component-label'>Enter your password: </label>
        <input type='password' className='input-component' value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <Button title={'Signup'} onClickHandler={onClickHandler} />
      <p className='sign-up-para'>Already have an account? <a className='sign-up-anchor' onClick={() => navigate('/login')}>Login</a></p>
      <Button title={'Signup using Google'} />
      <Button title={'Signup using Phone no.'} />
    </div>
  );
}
