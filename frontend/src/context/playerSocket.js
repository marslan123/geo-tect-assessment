import createContext from './index';
import io from 'socket.io-client';
import { SOCKET_BASE_URL } from '../config';

//This File Contain all the method to get the data or put the to the API
const PLAYER_SOCKET = SOCKET_BASE_URL + '/player';
const socketReducer = (state, action) => {
  switch (action.type) {
    case 'connect':
      return action.payload;
    default:
      return state;
  }
};

const SocketConnect = (dispatch) => {
  return async (auth) => {
    console.log(PLAYER_SOCKET);
    const socketID = io(PLAYER_SOCKET, { auth });
    dispatch({ type: 'connect', payload: socketID });
  };
};

export const { Context, Provider } = createContext(
  socketReducer,
  {
    SocketConnect,
  },
  null
);
