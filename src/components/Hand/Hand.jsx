import React from 'react';
import { Score } from '../Score/Score';

// REFACTOR using SASS?
// to conditional render black and red cards - hidden and non-hidden cards?
import './Hand.css';

export const Hand = ({ whoseHand, hand, score, isHidden, totalScore }) => {
  const currentHand = hand.map((card, index) => {
    // css for hidden card
    let cardClassName = 'card';
    if (isHidden && index === 1) {
      cardClassName = 'hidden-card';
      card.value = null;
      card.suit = null;
    }
    return (
      <div className={cardClassName} key={index}>
        <h3>{card.value}</h3>
        <h3>{card.suit}</h3>
      </div>
    );
  });

  return (
    <>
      <div className='hand'>{currentHand}</div>
      <Score
        whoseHand={whoseHand}
        score={score}
        totalScore={totalScore}
        isHidden={isHidden}
      />
    </>
  );
};
