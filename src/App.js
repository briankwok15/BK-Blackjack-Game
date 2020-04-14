import React, { useState } from 'react';
import Game from '../src/container/Game';
import { Start } from '../src/components/Start/Start';

import './App.css';

function App() {
  const [toogle, setToogle] = useState(false);

  let mainOrGame;
  if (toogle) {
    mainOrGame = <Game />;
  } else {
    mainOrGame = <Start setToogle={setToogle} />;
  }

  return <div className='App'>{mainOrGame}</div>;
}

export default App;
