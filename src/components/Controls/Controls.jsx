import React from 'react';

export const Controls = ({ hit, stand }) => {
  return (
    <>
      <button onClick={() => hit('player')}>Hit</button>
      <button onClick={() => stand()}>Stand</button>
    </>
  );
};
