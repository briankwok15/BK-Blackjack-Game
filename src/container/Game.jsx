import React, { Component } from 'react';

import '../components/Money/Money';
import { Money } from '../components/Money/Money';
import { Bet } from '../components/Bet/Bet';
import { Hand } from '../components/Hand/Hand';
import { Controls } from '../components/Controls/Controls';
export class Game extends Component {
  constructor() {
    super();
    this.state = {
      deck: [],
      winner: null,
      dealerHand: [],
      playerHand: [],
      dealerScore: { hardScore: 0, softScore: 0 },
      playerScore: { hardScore: 0, softScore: 0 },
      isGameOn: false,
      betAmount: 0,
      totalMoney: 100,
      isBetLocked: false,
      isDealOn: false,
      isHidden: true,
    };
    this.lockBet = this.lockBet.bind(this);
    this.firstDeal = this.firstDeal.bind(this);
    this.totalScore = this.totalScore.bind(this);
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

  // lockbet
  // if isGameOn false cannot bet
  // cannont bet more than total money
  // cannot re-bet
  lockBet(amount) {
    const { isGameOn, isBetLocked, totalMoney } = this.state;
    if (!isGameOn) return;
    if (isBetLocked) return;
    if (amount > totalMoney) return;
    this.setState((prevState) => ({
      isBetLocked: true,
      totalMoney: prevState.totalMoney - amount,
    }));
  }

  // deal
  deal() {
    const { deck } = this.state;
    const card = deck.pop();
    return card;
  }

  // scores give card
  handScore(score, card) {
    if (card.value === 'A') {
      score.hardScore += 1;
      score.softScore += score.softScore + 11 > 21 ? 1 : 11;
    } else if (typeof card.value === 'string') {
      score.hardScore += 10;
      score.softScore += 10;
    } else {
      score.hardScore += card.value;
      score.softScore += card.value;
    }
  }

  // total score
  totalScore(score) {
    if (score.hardScore === 21 || score.softScore === 21) return 21;
    if (score.softScore > 21) return score.hardScore;
    else {
      return score.softScore;
    }
  }

  // hit - need to add feature to not be able to hit before hand is delt
  // removes a card from the deck and return the card
  hit(playerOrDealer) {
    const { dealerScore, playerScore } = this.state;
    let unknownHand;
    let unknownScore;
    if (playerOrDealer === 'dealer') {
      unknownHand = 'dealerHand';
      unknownScore = dealerScore;
    } else {
      unknownHand = 'playerHand';
      unknownScore = playerScore;
    }
    const card = this.deal();
    const cardScore = this.handScore(unknownScore, card);
    this.setState((prevState) => ({
      [unknownHand]: [...prevState[unknownHand], card],
      [unknownScore]: cardScore,
    }));
  }

  winner(winner) {
    const { lockBet } = this.state;
    let money = lockBet;
    if (winner === 'dealer') money = 0;
    if (winner === 'player') money *= 2;
    this.setState({
      winner,
      totalMoney: money,
      dealerHand: [],
      playerHand: [],
      dealerScore: {},
      playerScore: {},
      isPrivate: false,
      isBetLocked: false,
      isDealOn: false,
    });
  }

  // deal
  firstDeal() {
    const { isBetLocked, isDealOn, dealerScore, playerScore } = this.state;
    if (!isBetLocked) return;
    if (isDealOn) return; // so player is unable to re-deal
    for (let i = 0; i < 2; i++) {
      this.hit('player');
      this.hit('dealer');
    }
    const dealerTotalScore = this.totalScore(dealerScore);
    const playerTotalScore = this.totalScore(playerScore);
    if (dealerTotalScore === 21 && playerTotalScore === 21) {
      this.winner('push');
      return;
    }
    if (dealerTotalScore === 21) {
      this.winner('dealer');
      return;
    }
    if (playerTotalScore === 21) {
      this.setState({ isDealOn: true }, () => {
        this.stand();
      });
      return;
    }
    this.setState({
      isDealOn: true,
    });
  }

  // gives game results
  results() {
    const { dealerScore, playerScore } = this.state;
    const dealerFinalScore = this.totalScore(dealerScore);
    const playerFinalScore = this.totalScore(playerScore);
    if (dealerFinalScore === playerFinalScore) {
      return 'PUSH';
    }
    if (dealerFinalScore > playerFinalScore && dealerFinalScore <= 21) {
      return 'Dealer';
    }
    return 'Player';
  }
  /**
   * CONTINUE HERE
   *
   */
  stand() {
    const { isDealOn, dealerScore, playerScore } = this.state;
    if (!isDealOn) return;
    const dealerTotalScore = this.totalScore(dealerScore);
    const playerTotalScore = this.totalScore(playerScore);
    if (dealerTotalScore < 17) {
      this.hit('dealer');
      this.stand();
    }
    // both player and dealer bust
    if (dealerTotalScore > 21 && playerTotalScore > 21) {
      this.winner('dealer');
      return;
    }
    const whoWon = this.results();
    // update winner on who won;
    this.winner(whoWon);
  }

  render() {
    const {
      isGameOn,
      betAmount,
      totalMoney,
      dealerHand,
      dealerScore,
      playerHand,
      playerScore,
      isHidden,
      isBetLocked,
      winner,
    } = this.state;
    const { lockBet, firstDeal, totalScore } = this;

    // start game button
    let startButton = (
      <button onClick={() => this.createDeck()}>Start Game!</button>
    );
    if (isGameOn) {
      startButton = null;
    }

    return (
      <>
        <header>
          <Money betAmount={betAmount} totalMoney={totalMoney} />
        </header>
        {startButton}
        <Bet
          lockBet={lockBet}
          firstDeal={firstDeal}
          isBetLocked={isBetLocked}
        />
        <Hand
          whoseHand='dealer'
          hand={dealerHand}
          score={dealerScore}
          isHidden={isHidden}
          totalScore={totalScore}
        />
        <Hand
          whoseHand='player'
          hand={playerHand}
          score={playerScore}
          totalScore={totalScore}
        />
        <Controls />
      </>
    );
  }
}
