import React from 'react';
import { Score } from '../Score/Score';

export const Hand = ({ whoseHand, hand, score, isHidden, totalScore }) => {
  const currentHand = hand.map((card, index) => {
    return (
      <div key={index}>
        <h3>{card.value}</h3>
        <h3>{card.suit}</h3>
      </div>
    );
  });

  return (
    <>
      {currentHand}
      <Score score={score} totalScore={totalScore} />
    </>
  );
};
