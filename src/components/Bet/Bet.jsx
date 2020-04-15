import React, { useState } from 'react';

import './Bet.css';

// TODO: Need to reset inputbox to empty string && input not a number

/**
 * render:
 * inputbox to place bet
 * button to lockbet
 */
export const Bet = ({ lockBet, firstDeal, isBetLocked }) => {
  const [amount, setAmount] = useState(0);

  return (
    <div className='bet-container'>
      <input
        type='text'
        placeholder='$'
        onChange={(event) => setAmount(parseInt(event.target.value))}
      />
      <button id='bet-button' onClick={() => lockBet(amount)}>
        Place Bet
      </button>
      <button id='deal-button' onClick={() => firstDeal()}>
        Deal
      </button>
    </div>
  );
};
