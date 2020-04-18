import React from 'react';

import Logo from '../Logo/Logo';

import './Splash.css';
import '../../CSS/Animate/animate.css';

export const Splash = ({ setToogle }) => {
  return (
    <div>
      <div className="animated jackInTheBox logo-container">
        <Logo />
      </div>
      <button
        className="animated fadeInLeftBig play-button"
        onClick={() => setToogle(true)}
      >
        Play!
      </button>
    </div>
  );
};
