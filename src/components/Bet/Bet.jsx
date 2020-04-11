import React, { useState } from 'react';

/**
 * render:
 * inputbox to place bet
 * button to lockbet
 */
export const Bet = ({ lockBet }) => {
  const [amount, setAmount] = useState(0);
  return (
    <div>
      <input
        type='text'
        onChange={(event) => setAmount(parseInt(event.target.value))}
      />
      <button onClick={() => lockBet(amount)}>Place Bet</button>
    </div>
  );
};
