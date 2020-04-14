import React from 'react';

export const Controls = ({ hit, stand, isDealOn }) => {
  let control = null;
  if (isDealOn) {
    control = (
      <div>
        <button onClick={() => hit('player')}>Hit</button>
        <button onClick={() => stand()}>Stand</button>
      </div>
    );
  }
  return <>{control}</>;
};
