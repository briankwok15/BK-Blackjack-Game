import React from 'react';

export const DisplayWinner = ({ winner }) => {
  let whoWon;
  if (!winner) {
    whoWon = null;
  } else {
    whoWon = <h3>{winner} Wins!</h3>;
  }
  return <section>{whoWon}</section>;
};
