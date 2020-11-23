import React, { FunctionComponent } from 'react';
import shallow from 'zustand/shallow';
import { useGameStore } from './store';

const Scoreboard:FunctionComponent = () => {
  const [scored, missed] = useGameStore(state => [state.score, state.missed], shallow);
  return (
    <div>
      <div>scored: {scored}</div>
      <div>missed: {missed}</div>
    </div>
  );
};

export default Scoreboard;
