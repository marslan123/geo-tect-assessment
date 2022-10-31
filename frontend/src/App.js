import './App.css';
import { Route, Routes } from 'react-router-dom';
import StartGame from './pages/StartGame';
import GameBoard from './pages/GameBoard';
import PlayerBoard from './pages/PlayerBoard';
import NotFound from './pages/NotFound';

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='*' element={<NotFound />} />
        <Route path='/' element={<StartGame />} />
        <Route path='/game-board' element={<GameBoard />} />
        <Route path='/player' element={<PlayerBoard />} />
      </Routes>
    </div>
  );
}

export default App;
