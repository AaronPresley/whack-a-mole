import React from 'react';
import { Global, css } from '@emotion/react';
import GameBoard from './GameBoard';

const globalStyles = css`
  html, body {
    min-height: 100%;
  }

  body, #root {
    height: 100vh;
    margin: 0;
  }
  
  #root {
    display: flex;
    flex-direction: column;
  }
`;

const App = () => (
  <>
    <Global styles={globalStyles} />
    <GameBoard />
  </>
);

export default App;
