import React, { FunctionComponent } from 'react';
import shallow from 'zustand/shallow';
import Grid from './Grid';
import Scoreboard from './Scoreboard';
import { useGameStore } from './store';


const GameBoard:FunctionComponent = () => {
  const [ gameInProgress, gameOver, gameWon, startNewGame ] = useGameStore(state => [
    state.gameInProgress, state.gameOver, state.gameWon, state.startGame
  ], shallow);
  
  const rows = 10;
  const cols = 20;
  
  const gameReady = !gameInProgress && !gameOver;
  const gameRunning = gameInProgress && !gameOver;

  return (
    <>
      {!gameOver && (
        <>
          <Scoreboard />
          { gameReady && (
            <button onClick={e => startNewGame(rows, cols)}>Start Game</button>
          )}
          {gameRunning && (
            <Grid rows={rows} columns={cols} />
          )}
        </>
      )}
      
      {gameOver && (
        <>{ gameWon ? <>You Win 🎉</> : <>You Lose ☹️</> }</>
      )}
    </>
  );
};

export default GameBoard;
