import React from 'react';
import PropTypes from 'prop-types';

import './DisplayWinner.css';
import '../../css/Animate/animate.css';

/**
 *
 * @param {String} winner - dealer, player, or PUSH
 * Renders the result of the hand
 */
const DisplayWinner = ({ winner }) => {
  let whoWon;
  if (winner === '') {
    whoWon = null;
  } else if (winner === 'PUSH') {
    whoWon = <h1 className="animated fadeInLeftBig winner">{winner}</h1>;
  } else {
    whoWon = <h1 className="animated fadeInLeftBig winner">{winner} Wins!</h1>;
  }
  return <div className="winner-container">{whoWon}</div>;
};

DisplayWinner.propTypes = {
  winner: PropTypes.string.isRequired,
};

export default DisplayWinner;
