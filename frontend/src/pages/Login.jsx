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

      const response = await axios.post(`http://localhost:4040/api/user/access-token`, {
        username: email,
        password,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('Response: ', response.data);
      localStorage.setItem('access-token', JSON.stringify(response.data));
      setEmail('');
      setPassword('');
      navigate('/');
    } catch (err) {
      console.error('Error occurred while registering user, Please try again later. Error: ', err.response);
      alert(`Error: ${err.response.data}`);
    }
  }

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
      <p className='sign-up-para'>Don't have an account? <a className='sign-up-anchor' onClick={() => navigate('/signup')}>Signup</a></p>
      <Button title={'Login using Google'} />
      <Button title={'Login using Phone no.'} />
    </div>
  );
}
