import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.scss';
import { v4 as uuidv4 } from 'uuid';

const StartGame = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  function handleChange(e) {
    setName(e.target.value);
  }
  function handleSubmit() {
    const data = {
      name,
      id: uuidv4(),
    };
    if (name === '') {
      alert('Player Name is Required!');
    } else {
      navigate('/player', { state: { ...data } });
    }
  }
  return (
    <div className='start-game'>
      <div className='start-game-container'>
        <h1>Start Game</h1>
        <input onChange={handleChange} placeholder='Enter Name' />
        <button onClick={handleSubmit}>Start</button>
      </div>
    </div>
  );
};

export default StartGame;
