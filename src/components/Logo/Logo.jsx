import React from 'react';

import logo from '../../assets/Images/spade.png';
import './Logo.css';

/**
 * Renders:
 * Title
 * Image
 */
const Logo = () => {
  return (
    <div className="logo-container">
      <h1 id="title">BlackJack!</h1>
      <img id="logo" alt="logo" src={logo} />
    </div>
  );
};

export default Logo;
