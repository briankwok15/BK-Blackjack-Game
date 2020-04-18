import React from 'react';
import PropTypes from 'prop-types';

import './Control.css';

/**
 *
 * @param {Function} hit - add a card and update player's score
 * @param {stand} stand - player decides to stop, player bust, or player gets blackjack
 * @param {Boolean} isDealOn - allows to render controls button if set to true
 */
const Controls = ({ hit, stand, isDealOn }) => {
  let control = null;
  if (isDealOn) {
    control = (
      <div className="controls">
        <button type="submit" id="hit" onClick={() => hit('player')}>
          Hit
        </button>
        <button type="submit" id="stand" onClick={() => stand()}>
          Stand
        </button>
      </div>
    );
  }
  return <>{control}</>;
};

Controls.propTypes = {
  hit: PropTypes.func.isRequired,
  stand: PropTypes.func.isRequired,
  isDealOn: PropTypes.bool.isRequired,
};

export default Controls;
