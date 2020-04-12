import React from 'react';

export const Score = ({ score, totalScore }) => {
  const renderScore = totalScore(score);
  return <>{renderScore}</>;
};
