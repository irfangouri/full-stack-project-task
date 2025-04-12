import React from 'react';
import './button.css';

export default function Button({ title, onClickHandler }) {
  return (
    <div className='btn-div'>
      <button className='btn' onClick={onClickHandler}>{title}</button>
    </div>
  );
}
