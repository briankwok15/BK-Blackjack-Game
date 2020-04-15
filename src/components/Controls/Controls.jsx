import React from 'react';

import './Control.css';

export const Controls = ({ hit, stand, isDealOn }) => {
  let control = null;
  if (isDealOn) {
    control = (
      <div className='controls'>
        <button id='hit' onClick={() => hit('player')}>
          Hit
        </button>
        <button id='stand' onClick={() => stand()}>
          Stand
        </button>
      </div>
    );
  }
  return <>{control}</>;
};
