import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './Bet.css';

/**
 *
 * @param {Function} lockedBet - to set bet amount in Game container
 * @param {Function} firstDeal - once bet is placed, allowed to deal cards
 * Renders:
 * Inputbox for bet amount
 * Place bet button
 * Deal button
 */

const Bet = ({ lockBet, firstDeal }) => {
  const [amount, setAmount] = useState(0);

  return (
    <div className="bet-container">
      <input
        data-testid="bet-input-test"
        type="text"
        placeholder="$"
        onChange={(event) => setAmount(parseInt(event.target.value, 10))}
      />
      <button
        data-testid="place-bet-button"
        type="submit"
        id="bet-button"
        onClick={() => lockBet(amount)}
      >
        Place Bet
      </button>
      <button
        data-testid="deal-button"
        type="submit"
        id="deal-button"
        onClick={() => firstDeal()}
      >
        Deal
      </button>
    </div>
  );
};

Bet.propTypes = {
  lockBet: PropTypes.func.isRequired,
  firstDeal: PropTypes.func.isRequired,
};

export default Bet;
