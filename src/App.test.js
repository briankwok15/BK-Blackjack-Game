import React from 'react';
import { cleanup, render } from '@testing-library/react';
import ReactTestUtils from 'react-dom/test-utils';
import App from './App';

// clean up DOM
afterEach(cleanup);

test('renders splash screen then game on play button click', () => {
  // arrange
  const { getByText, getByTestId } = render(<App />);
  const logoNode = document.getElementById('title');
  const buttonNode = getByText('Play!');

  // act
  ReactTestUtils.Simulate.click(buttonNode);

  // assert
  expect(logoNode).toBeTruthy();
  expect(buttonNode).toBeTruthy();
  expect(getByTestId('game-test')).toBeTruthy();
});
