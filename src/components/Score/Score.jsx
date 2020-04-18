import React from 'react';
import PropTypes from 'prop-types';

import './Score.css';
// REFACTOR if/else if statemnts?

/**
 *
 * @param {String} whoseHand - 'dealer' or 'player'
 * @param {Object} score - { hardTotals, softTotals }
 * @param {Function} totalScore - function to calculate hand score
 * @param {Boolean} isHidden - true or false to show dealer's second card
 */
const Score = ({ whoseHand, score, totalScore, isHidden }) => {
  let renderScore = totalScore(score);
  let handHolder;
  // just so before deal 'zeros' will now appear in window
  if (renderScore === 0) {
    renderScore = null;
    handHolder = null;
  } else if (isHidden && whoseHand === 'dealer') {
    handHolder = `${whoseHand} score: `;
    renderScore = null;
  } else {
    handHolder = `${whoseHand} score: `;
  }
  return (
    <div className="score">
      <h1>
        {handHolder}
        {renderScore}
      </h1>
    </div>
  );
};

Score.propTypes = {
  whoseHand: PropTypes.string.isRequired,
  score: PropTypes.object.isRequired,
  totalScore: PropTypes.func.isRequired,
  isHidden: PropTypes.bool,
};
export default Score;
