import React from 'react';

import './Money.css';

export const Money = ({ betAmount, totalMoney }) => {
  return (
    <div className='money-container'>
      <h3 id='bet-amount'>bet amount: {betAmount}</h3>
      <h3>total money: {totalMoney}</h3>
    </div>
  );
};
