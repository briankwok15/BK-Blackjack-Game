function totalScoreMock(score) {
  if (score.hardScore === 21 || score.softScore === 21) return 21;
  if (score.softScore > 21) return score.hardScore;

  return score.softScore;
}

module.exports = totalScoreMock;
