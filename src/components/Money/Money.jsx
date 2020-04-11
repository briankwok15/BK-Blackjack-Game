import React from 'react';

export const Money = ({ betAmount, totalMoney }) => {
  return (
    <>
      <h3>Bet Amount: {betAmount}</h3>
      <h3>Total Money: {totalMoney}</h3>
    </>
  );
};
