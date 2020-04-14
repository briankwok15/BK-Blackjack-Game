import React from 'react';

import logo from '../../assets/Images/spade.png';
import './Start.css';
import '../../Animate CSS/animate.css';

export const Start = ({ setToogle }) => {
  return (
    <div>
      <div className='animated jackInTheBox logo-container'>
        <h1 id='title'>BlackJack!</h1>
        <img id='logo' alt='logo' src={logo} />
      </div>
      <button
        className='animated fadeInLeftBig play-button'
        onClick={() => setToogle(true)}
      >
        Play!
      </button>
    </div>
  );
};
