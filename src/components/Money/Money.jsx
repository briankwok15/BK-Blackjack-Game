import React from 'react';
import PropTypes from 'prop-types';

import './Money.css';

const Money = ({ betAmount, totalMoney }) => {
  return (
    <div className="money-container">
      <h3 id="bet-amount">bet amount: {betAmount}</h3>
      <h3>total money: {totalMoney}</h3>
    </div>
  );
};

Money.propTypes = {
  betAmount: PropTypes.number.isRequired,
  totalMoney: PropTypes.number.isRequired,
};

export default Money;
