import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './Bet.css';

const Bet = ({ lockBet, firstDeal }) => {
  const [amount, setAmount] = useState(0);

  return (
    <div className="bet-container">
      <input
        type="text"
        placeholder="$"
        onChange={(event) => setAmount(parseInt(event.target.value, 10))}
      />
      <button type="submit" id="bet-button" onClick={() => lockBet(amount)}>
        Place Bet
      </button>
      <button type="submit" id="deal-button" onClick={() => firstDeal()}>
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
