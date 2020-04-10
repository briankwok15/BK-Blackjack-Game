import React, { Component } from 'react';

export class Game extends Component {
  constructor() {
    super();
    this.state = {
      deck: [],
      isGameOn: false,
    };
  }

  // creation of shuffled deck
  createDeck() {
    const currentDeck = [];
    const cardVals = ['A', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K'];
    const cardSuits = ['♠', '♦', '♣️', '♥'];
    cardSuits.forEach((suit) => {
      cardVals.forEach((value) => {
        currentDeck.push({ value, suit });
      });
    });

    // shuffle
    for (let i = currentDeck.length; i > 0; i--) {
      const lastCard = i - 1;
      const randomIndex = Math.floor(Math.random() * lastCard);
      const randomCard = currentDeck[randomIndex];
      currentDeck[randomIndex] = currentDeck[lastCard];
      currentDeck[lastCard] = randomCard;
    }
    this.setState({ deck: currentDeck, isGameOn: true });
  }

  render() {
    const { deck, isGameOn } = this.state;
    // start game button
    let startButton = (
      <button onClick={() => this.createDeck()}>Start Game!</button>
    );
    if (isGameOn) {
      startButton = null;
    }

    return (
      <main className='game'>
        {startButton}
        {console.log('deck', deck)}
      </main>
    );
  }
}
