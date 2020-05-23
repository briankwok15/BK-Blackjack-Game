import React from 'react';

import './GameOver.css';
import '../../CSS/Animate/animate.css';

import PropTypes from 'prop-types';

const GameOver = ({ reloadTotalMoney }) => {
  return (
    <div className="animated fadeInLeftBig game-over-container">
      <div className="game-over-inner">
        <h3>No More Money!</h3>
        <button id="reload" type="submit" onClick={() => reloadTotalMoney()}>
          Reload Money
        </button>
      </div>
    </div>
  );
};

GameOver.propTypes = {
  reloadTotalMoney: PropTypes.func.isRequired,
};

export default GameOver;
