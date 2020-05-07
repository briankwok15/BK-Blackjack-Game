// test that if isHidden is true then dealer's card is face down
// and score is null
// test if isHidden is false then all cards are face up
// test that score is displayed
import React from 'react';
import { render, cleanup } from '@testing-library/react';
import totalScore from './utils/totalScore-test-utils';
import Hand from '../Hand';

beforeEach(cleanup);

test('on deal - if isHidden is true, dealer second card is face down', () => {
  // arrange
  const whoseHand = 'dealer';
  const fakeHand = [
    { value: 2, suit: '♥' },
    { value: 8, suit: '♠' },
  ];
  const fakeScore = { hardScore: 15, softScore: 15 };
  const { getByText, container } = render(
    <Hand
      whoseHand={whoseHand}
      hand={fakeHand}
      score={fakeScore}
      isHidden
      totalScore={totalScore}
    />
  );
  const hiddenCard = container.getElementsByClassName(
    'animated fadeInDown hidden-card'
  );
  const nonHiddenCard = container.getElementsByClassName(
    'animated fadeInDown card'
  );
  const scoreNode = getByText('dealer score:');
  // act
  // assert
  expect(hiddenCard).toBeTruthy(); // hidden card
  expect(nonHiddenCard).toBeTruthy(); // non hidden card
  expect(scoreNode.outerHTML).toMatch('<h1>dealer score: </h1>');
});

test(`on deal - player's hand`, () => {
  // arrange
  const whoseHand = 'player';
  const fakeHand = [
    { value: 2, suit: '♥' },
    { value: 8, suit: '♠' },
  ];
  const fakeScore = { hardScore: 15, softScore: 15 };
  const { container } = render(
    <Hand
      whoseHand={whoseHand}
      hand={fakeHand}
      score={fakeScore}
      isHidden={false}
      totalScore={totalScore}
    />
  );
  const hiddenCard = document.getElementsByClassName(
    'animated fadeInDown hidden-card'
  );
  const scoreNode = container.querySelector('.score');
  // act
  // assert
  expect(hiddenCard.outerHTML).toBe(undefined); // hidden card is not found
  expect(scoreNode.outerHTML).toMatch(
    '<div class="score"><h1>player score: 15</h1></div>'
  );
});
