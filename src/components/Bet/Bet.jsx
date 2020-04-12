import React, { useState } from 'react';

// TODO: Need to reset inputbox to empty string

/**
 * render:
 * inputbox to place bet
 * button to lockbet
 */
export const Bet = ({ lockBet, firstDeal, isBetLocked }) => {
  const [amount, setAmount] = useState(0);

  return (
    <div>
      <input
        type='text'
        onChange={(event) => setAmount(parseInt(event.target.value))}
      />
      <button onClick={() => lockBet(amount)}>Place Bet</button>
      <button onClick={() => firstDeal()}>Deal</button>
    </div>
  );
};
