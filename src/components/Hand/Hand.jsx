import React from 'react';
import { Score } from '../Score/Score';

// REFACTOR using SASS?
// to conditional render black and red cards - hidden and non-hidden cards?
import './Hand.css';
import '../../Animate CSS/animate.css';

export const Hand = ({ whoseHand, hand, score, isHidden, totalScore }) => {
  console.log('hidden', isHidden)
  const currentHand = hand.map((card, index) => {
    // css for hidden card
    let cardClassName = 'animated fadeInDown card';
    if (card.suit === '♦' || card.suit === '♥') {
      cardClassName = 'animated fadeInDown card-red';
    }
    if (isHidden && index === 1) {
      cardClassName = 'animated fadeInDown hidden-card';
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
