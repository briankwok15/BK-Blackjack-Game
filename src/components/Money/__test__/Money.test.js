import React from 'react';
import { cleanup, render } from '@testing-library/react';
import Money from '../Money';

afterEach(cleanup);

test('bet amount and total money is properly displayed', () => {
  // arrange
  const fakeBet = 20;
  const fakeTotalMoney = 100;
  const { getByTestId } = render(
    <Money betAmount={fakeBet} totalMoney={fakeTotalMoney} />
  );
  // act
  const betAmountNode = getByTestId('bet-amount-test');
  const totalMoneyNode = getByTestId('total-money-test');

  // assert
  expect(betAmountNode.innerHTML).toBe('bet amount: 20');
  expect(totalMoneyNode.innerHTML).toBe(`total money: 100`);
});
