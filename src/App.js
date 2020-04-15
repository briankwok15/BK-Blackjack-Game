import React, { useState } from 'react';
import Game from '../src/container/Game';
import { Splash } from '../src/components/Splash/Splash';

import './App.css';

function App() {
  const [toogle, setToogle] = useState(false);

  let mainOrGame;
  if (toogle) {
    mainOrGame = <Game />;
  } else {
    mainOrGame = <Splash setToogle={setToogle} />;
  }

  return <div className='App'>{mainOrGame}</div>;
}

export default App;
