import React, { useState } from 'react';
import Game from './container/Game';
import Splash from './components/Splash/Splash';

import './App.css';
/**
 * Renders:
 * Splash compnent or Game container
 */
function App() {
  const [toogle, setToogle] = useState(false);

  let mainOrGame;
  if (toogle) {
    mainOrGame = <Game />;
  } else {
    mainOrGame = <Splash setToogle={setToogle} />;
  }

  return <div className="App">{mainOrGame}</div>;
}

export default App;
