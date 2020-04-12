import React from 'react';

// REFACTOR if/else if statemnts?

export const Score = ({ whoseHand, score, totalScore, isHidden }) => {
  let renderScore = totalScore(score);
  // just so before deal 'zeros' will now appear in window
  if (renderScore === 0) {
    renderScore = null;
    whoseHand = null;
  } else if (isHidden && whoseHand === 'dealer') {
    whoseHand = `${whoseHand} score: `;
    renderScore = null;
  } else {
    whoseHand = `${whoseHand} score: `;
  }
  return (
    <>
      <h2>
        {whoseHand}
        {renderScore}
      </h2>
    </>
  );
};
