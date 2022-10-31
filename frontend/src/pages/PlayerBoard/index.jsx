import React, { useContext, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Context as PlayerContext } from '../../context/playerSocket';
import {
  AiOutlineArrowUp,
  AiOutlineArrowRight,
  AiOutlineArrowLeft,
  AiOutlineArrowDown,
  AiOutlinePoweroff,
} from 'react-icons/ai';
import './style.scss';
const PlayerBoard = () => {
  const {
    state: { id, name },
  } = useLocation();
  const navigate = useNavigate();
  const { SocketConnect, socketID } = useContext(PlayerContext);
  if (!id) {
    navigate('/');
  }

  useEffect(() => {
    SocketConnect({ id, name });
  }, []);

  function handleQuit() {
    socketID.disconnect();
    navigate('/');
  }

  function handleUp() {
    socketID.emit(`${id}-up`, 10);
  }

  function handleDown() {
    socketID.emit(`${id}-down`, 10);
  }

  function handleLeft() {
    socketID.emit(`${id}-left`, 10);
  }

  function handleRight() {
    socketID.emit(`${id}-right`, 10);
  }

  function handleA() {
    socketID.emit(`${id}-A`, 1);
  }

  function handleB() {
    socketID.emit(`${id}-B`, 1);
  }

  return (
    <div className='player-board'>
      <button className='power-off' onClick={handleQuit}>
        <AiOutlinePoweroff />
      </button>
      <h2>Game Controller</h2>
      <div className='row player-board-container'>
        <div className='d-pad'>
          <button className='Up' onClick={handleUp}>
            <AiOutlineArrowUp />
          </button>
          <div className='row d-pad-mid'>
            <button className='left' onClick={handleLeft}>
              <AiOutlineArrowLeft />
            </button>
            <button className='right' onClick={handleRight}>
              <AiOutlineArrowRight />
            </button>
          </div>
          <button className='down' onClick={handleDown}>
            <AiOutlineArrowDown />
          </button>
        </div>
        <div className='action-button'>
          <button className='A' onClick={handleA}>
            A
          </button>
          <button className='B' onClick={handleB}>
            B
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlayerBoard;
