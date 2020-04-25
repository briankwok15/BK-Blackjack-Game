import React from 'react';
import PropTypes from 'prop-types';

import Logo from '../Logo/Logo';

import './Splash.css';
import '../../css/Animate/animate.css';

/**
 *
 * @param {Function} setToogle - function to set toogle to true, button pressed
 * Renders:
 * Logo
 * Button - on click will set toogle (app.js) to true and render Game container
 */
const Splash = ({ setToogle }) => {
  return (
    <div>
      <div className="animated jackInTheBox logo-container">
        <Logo />
      </div>
      <button
        type="submit"
        className="animated fadeInLeftBig play-button"
        onClick={() => setToogle(true)}
      >
        Play!
      </button>
    </div>
  );
};

Splash.propTypes = {
  setToogle: PropTypes.func.isRequired,
};

export default Splash;
