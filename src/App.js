import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import Phaser from 'phaser';
import config from './games/flappyBird';
import * as braincadeSDK from './braincadeSDK';

function App() {

  const [gameStarted, setGameStarted] = useState(false);
  const [gamePaused, setGamePaused] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    window.addEventListener('pauseGame', handlePauseEvent);
    window.addEventListener('gameOver', handleGameOverEvent);
  }, [])

  useEffect(() => {
    if (gameStarted) {
      const game = new Phaser.Game(config);
    }
  }, [gameStarted]);

  const handlePauseEvent = () => {
    setGamePaused(true);
  };

  const handleResumeGame = () => {
    setGamePaused(false);
    braincadeSDK.initiateResumeGame();
  };

  const handleRestartGame = () => {
    setGameOver(false);
    setGamePaused(false);
    braincadeSDK.initiateRestartGame();
  };

  const handleGameOverEvent = () => {
    setGamePaused(false);
    setGameOver(true);
    setGameStarted(false);
  };

  const handleDestroyGame = () => {
    setGameOver(false);
    setGamePaused(false);
    setGameStarted(false);
    braincadeSDK.initiateDestroyGame();
  };

  const handleStartGame = () => {
    setGameOver(false);
    setGamePaused(false);
    setGameStarted(true);
  };

  return (
    <div className="App">
      <div>
        {!gameStarted && !gameOver && <button onClick={handleStartGame}>Start Game</button>}
        {gamePaused && (
          <div>
            <div>GAME PAUSED</div>
            <button onClick={handleResumeGame}>Resume Game</button>
            <button onClick={handleDestroyGame}>Destroy Game</button>
            <button onClick={handleRestartGame}>Restart Game</button>
          </div>
        )}
        {gameOver && (
          <div>
            <div>GAME OVER</div>
            <button onClick={handleStartGame}>Restart Game</button>
            <button onClick={handleDestroyGame}>Destroy Game</button>
          </div>
        )}
        <div id="game-container" style={{ display: gameStarted ? 'block' : 'none' }}></div>
      </div>
    </div>
  );
}

export default App;
