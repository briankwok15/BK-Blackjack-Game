import React from 'react';
import PropTypes from 'prop-types';

import './Control.css';

const Controls = ({ hit, stand, isDealOn }) => {
  let control = null;
  if (isDealOn) {
    control = (
      <div className="controls">
        <button type="submit" id="hit" onClick={() => hit('player')}>
          Hit
        </button>
        <button type="submit" id="stand" onClick={() => stand()}>
          Stand
        </button>
      </div>
    );
  }
  return <>{control}</>;
};

Controls.propTypes = {
  hit: PropTypes.func.isRequired,
  stand: PropTypes.func.isRequired,
  isDealOn: PropTypes.bool.isRequired,
};

export default Controls;
