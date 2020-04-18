import React from 'react';
import PropTypes from 'prop-types';

import Score from '../Score/Score';

import './Hand.css';
import '../../css/Animate/animate.css';

/**
 *
 * @param {String} whoseHand - 'dealer' or 'player'
 * @param {Array} hand - [{ card.suit, card.value }]
 * @param {Score} score - { hardScore, softScore }
 * @param {Boolean} isHidden - true or false - for dealer hand to hide second card
 * @param {Function} totalScore - function to calculate score based on card
 * Render:
 * Score Component
 */
const Hand = ({ whoseHand, hand, score, isHidden, totalScore }) => {
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
      <div className={cardClassName} key={`${(whoseHand, index)}`}>
        <h3>{card.value}</h3>
        <h3>{card.suit}</h3>
      </div>
    );
  });

  return (
    <>
      <div className="hand">{currentHand}</div>
      <Score
        whoseHand={whoseHand}
        score={score}
        totalScore={totalScore}
        isHidden={isHidden}
      />
    </>
  );
};

Hand.propTypes = {
  whoseHand: PropTypes.string.isRequired,
  hand: PropTypes.array.isRequired,
  score: PropTypes.object.isRequired,
  isHidden: PropTypes.bool,
  totalScore: PropTypes.func.isRequired,
};

export default Hand;
