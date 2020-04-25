// display score if NOT hidden
// do not display score if hidden
import React from 'react';
import { render, cleanup } from '@testing-library/react';
import totalScore from '../../Hand/__test__/utils/totalScore-test-utils';
import Score from '../Score';

test('display score if NOT hidden', () => {
  const whoseHand = 'player';
  const fakeScore = { hardScore: 15, softScore: 15 };
  const faketotalScore = totalScore;
  const { container } = render(
    <Score
      whoseHand={whoseHand}
      score={fakeScore}
      totalScore={faketotalScore}
      isHidden={false}
    />
  );
  const scoreNode = container.querySelector('.score');
  expect(scoreNode.outerHTML).toMatch(
    '<div class="score"><h1>player score: 15</h1></div>'
  );
});

test('do not display score if hidden', () => {
  const whoseHand = 'dealer';
  const fakeScore = { hardScore: 15, softScore: 15 };
  const faketotalScore = totalScore;
  const { container } = render(
    <Score
      whoseHand={whoseHand}
      score={fakeScore}
      totalScore={faketotalScore}
      isHidden
    />
  );
  const scoreNode = container.querySelector('.score');
  expect(scoreNode.outerHTML).toMatch(
    '<div class="score"><h1>dealer score: </h1></div>'
  );
});
