import React from 'react';
import './text-input.css';

export default function InputComponent({ label, type }) {
  return (
    <div className='input-component-div'>
      <label className='input-component-label'>{label}</label>
      <input type={type} className='input-component' />
    </div>
  );
}
