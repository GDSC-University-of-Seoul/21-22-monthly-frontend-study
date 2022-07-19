import React from 'react';
import { getRandomWelcomeText } from './utils';

function App() {
  return (
    <div>
      <h1>{getRandomWelcomeText()}</h1>
    </div>
  );
}

export default App;