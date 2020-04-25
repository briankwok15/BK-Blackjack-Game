// test when user place bet it will subtract from total
// when player press deal - hand component is shown
// make sure that player cannot re-bet or re-deal if hand is active
import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import ReactTestUtils from 'react-dom/test-utils';
import Bet from '../Bet';
import App from '../../../App';

const betMock = jest.fn((x) => x);
const dealMock = jest.fn();

test('when user input bet, test that lockbet will be', () => {
  // arrange
  const { getByTestId } = render(
    <Bet lockBet={betMock} firstDeal={dealMock} />
  );
  const betInput = getByTestId('bet-input-test');
  const betButton = getByTestId('place-bet-button');
  betInput.value = 20;
  // act
  ReactTestUtils.Simulate.click(betButton);
  // assert
  expect(betMock).toHaveBeenCalledTimes(1);
  // expect(betMock).toHaveBeenCalledWith(betInput.value);
});

test('when user clicks deal - hands, score - and controls will display', () => {
  // arrange
  const { getByTestId } = render(
    <App />,
    <Bet lockBet={betMock} firstDeal={dealMock} />
  );
  const dealButtonNode = getByTestId('deal-button');
  // console.log(dealButtonNode.outerHTML);
  // act
  ReactTestUtils.Simulate.click(dealButtonNode);
  // console.log(getByTestId('hand-test'));
  // console.log('app', )
  // assert
  // expect(document.getElementsByClassName('hand')).toBeTruthy();
  // expect(document.getElementsByClassName('score')).toBeTruthy();
  // expect(document.getElementsByClassName('controls')).toBeTruthy();
});
