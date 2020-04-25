import React from 'react';
import PropTypes from 'prop-types';

import './Money.css';

/**
 *
 * @param {Integer} betAmount - how much money the player bet
 * @param {Integer} totalMoney - how much money the player has left
 * Renders:
 * Bet amount
 * Player's total money
 */
const Money = ({ betAmount, totalMoney }) => {
  return (
    <div className="money-container">
      <h3 data-testid="bet-amount-test" id="bet-amount">
        bet amount: {betAmount}
      </h3>
      <h3 data-testid="total-money-test">total money: {totalMoney}</h3>
    </div>
  );
};

Money.propTypes = {
  betAmount: PropTypes.number.isRequired,
  totalMoney: PropTypes.number.isRequired,
};

export default Money;
