import React from 'react';

import './DisplayWinner.css';
import '../../CSS/Animate/animate.css';

export const DisplayWinner = ({ winner }) => {
  let whoWon;
  if (!winner) {
    whoWon = null;
  } else if (winner === 'PUSH') {
    whoWon = <h1 className='animated fadeInLeftBig winner'>{winner}</h1>;
  } else {
    whoWon = <h1 className='animated fadeInLeftBig winner'>{winner} Wins!</h1>;
  }
  return <div className='winner-container'>{whoWon}</div>;
};
