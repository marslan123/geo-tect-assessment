import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import Canvas from '../../components/Canvas';
import { SOCKET_BASE_URL } from '../../config';
import './style.scss';

const GAME_SOCKET = SOCKET_BASE_URL + '/game';
const GameSocket = io(GAME_SOCKET, { autoConnect: false });
const GameBoard = () => {
  const [players, setPlayers] = useState([]);
  useEffect(() => {
    GameSocket.connect();
    GameSocket.on('players', (data) => {
      console.log(data);
      setPlayers(data);
    });

    return () => {
      GameSocket.off('players');
    };
  }, []);

  return (
    <div className='game-board'>
      <div className='game-state'>
        <h4 className='active-player'>Total Active Player :{players.length}</h4>
      </div>
      <div className='row'>
        {players.map((item, i) => (
          <div className='player-info' key={item.id}>
            <p className='player-name'>{item.name}</p>
            <div className='canvas-container' id={item.id}>
              <Canvas id={item.id} GameSocket={GameSocket} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameBoard;
