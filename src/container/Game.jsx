import React, { Component } from 'react';

import { Money } from '../components/Money/Money';

import Bet from '../components/Bet/Bet';
import { Hand } from '../components/Hand/Hand';
import { Controls } from '../components/Controls/Controls';
import { DisplayWinner } from '../components/DisplayWinner/DisplayWinner';
import { Logo } from '../components/Logo/Logo';

import './Game.css';

class Game extends Component {
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
      rounds: 0,
    };
    this.lockBet = this.lockBet.bind(this);
    this.firstDeal = this.firstDeal.bind(this);
    this.totalScore = this.totalScore.bind(this);
    this.hit = this.hit.bind(this);
    this.stand = this.stand.bind(this);
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
    this.setState({ deck: currentDeck, isGameOn: true, rounds: 1 });
  }

  // lockbet
  // if isGameOn false cannot bet
  // cannont bet more than total money
  // cannot re-bet
  lockBet(amount) {
    const { isGameOn, isBetLocked, totalMoney } = this.state;
    if (
      !isGameOn ||
      isBetLocked ||
      isNaN(amount) ||
      amount > totalMoney ||
      amount === 0
    )
      return;
    amount = parseInt(amount);
    this.setState((prevState) => ({
      isBetLocked: true,
      totalMoney: prevState.totalMoney - amount,
      dealerHand: [],
      playerHand: [],
      dealerScore: { hardScore: 0, softScore: 0 },
      playerScore: { hardScore: 0, softScore: 0 },
      isHidden: true,
      betAmount: amount,
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

    return score.softScore;
  }

  // hit - need to add feature to not be able to hit before hand is delt
  // removes a card from the deck and return the card
  hit(playerOrDealer) {
    const { dealerScore, playerScore, isDealOn } = this.state;
    if (!isDealOn) return; // if isDealOn is false return out, unable to hit
    let unknownHand;
    let unknownScore;
    if (playerOrDealer === 'Dealer') {
      unknownHand = 'dealerHand';
      unknownScore = dealerScore;
    } else {
      unknownHand = 'playerHand';
      unknownScore = playerScore;
    }
    const card = this.deal();
    const cardScore = this.handScore(unknownScore, card);
    this.setState(
      (prevState) => ({
        [unknownHand]: [...prevState[unknownHand], card],
        [unknownScore]: cardScore,
      }),
      () => {
        // checks if player bust
        if (playerOrDealer === 'Dealer') return;
        const { playerScore } = this.state;
        const playerHitScore = this.totalScore(playerScore);
        if (playerHitScore > 21) {
          this.stand();
        }
      }
    );
  }

  winner(winner) {
    const { betAmount, totalMoney } = this.state;
    let money = betAmount + totalMoney; // push
    if (winner === 'Dealer') money = 0 + totalMoney;
    if (winner === 'Player') money = betAmount * 2 + totalMoney;
    this.setState({
      winner,
      totalMoney: money,
      isPrivate: false,
      isBetLocked: false,
      isDealOn: false,
      isHidden: false,
      isGameOn: false,
    });
  }

  // deal
  firstDeal() {
    const { isBetLocked, isDealOn, dealerScore, playerScore } = this.state;
    if (!isBetLocked) return;
    if (isDealOn) return; // so player is unable to re-deal
    // set isDealOn to true here so we can run our hit function
    this.setState(
      {
        isDealOn: true,
      },
      () => {
        // dealing card to player and dealer
        for (let i = 0; i < 2; i++) {
          this.hit('Player');
          this.hit('Dealer');
        }
        const dealerTotalScore = this.totalScore(dealerScore);
        const playerTotalScore = this.totalScore(playerScore);
        if (dealerTotalScore === 21 && playerTotalScore === 21) {
          this.winner('Push');
          return;
        }
        if (dealerTotalScore === 21) {
          this.winner('Dealer');
          return;
        }
        if (playerTotalScore === 21) {
          this.setState({ isDealOn: true }, () => {
            this.stand();
          });
        }
      }
    );
  }

  // gives game results
  results() {
    const { dealerScore, playerScore } = this.state;
    const dealerFinalScore = this.totalScore(dealerScore);
    const playerFinalScore = this.totalScore(playerScore);
    switch (true) {
      case dealerFinalScore === playerFinalScore:
        return 'PUSH';
      case playerFinalScore > 21:
      case dealerFinalScore > playerFinalScore && dealerFinalScore <= 21:
        return 'Dealer';
      default:
        return 'Player';
    }
  }

  stand() {
    const { isDealOn, dealerScore, playerScore } = this.state;
    if (!isDealOn) return;
    const dealerTotalScore = this.totalScore(dealerScore);
    const playerTotalScore = this.totalScore(playerScore);
    if (dealerTotalScore < 17) {
      this.hit('Dealer');
      this.stand();
    }
    // both player and dealer bust
    if ((dealerTotalScore > 21 && playerTotalScore > 21) || playerScore > 21) {
      this.winner('Dealer');
      return;
    }
    const whoWon = this.results();
    // update winner on who won;
    this.winner(whoWon);
  }

  // play again or new round
  newRound() {
    this.setState(
      (prevState) => ({
        rounds: prevState.rounds + 1,
        isGameOn: true,
        winner: null,
        betAmount: 0,
        dealerHand: [],
        playerHand: [],
        dealerScore: { hardScore: 0, softScore: 0 },
        playerScore: { hardScore: 0, softScore: 0 },
      }),
      () => {
        const { rounds } = this.state;
        // re-shuffle every 4 rounds
        if (rounds === 4) {
          this.createDeck();
        }
      }
    );
  }

  render() {
    const {
      isDealOn,
      betAmount,
      totalMoney,
      dealerHand,
      dealerScore,
      playerHand,
      playerScore,
      isHidden,
      isBetLocked,
      winner,
      rounds,
    } = this.state;
    const { lockBet, firstDeal, totalScore, hit, stand } = this;

    // start game button
    let startButton = (
      <button id="start-button" onClick={() => this.createDeck()}>
        Start Game!
      </button>
    );
    if (rounds !== 0) {
      startButton = null;
    }

    // new round button
    let newRoundButton = null;
    if (winner) {
      newRoundButton = (
        <button id="new-round-button" onClick={() => this.newRound()}>
          New Round
        </button>
      );
    }

    return (
      <>
        <div className="game">
          <header>
            <Logo />
          </header>
          <main>
            <section>
              <Money betAmount={betAmount} totalMoney={totalMoney} />
            </section>
            <section>
              <div className="start-button-container">{startButton}</div>
              <div className="reload-button-container">{newRoundButton}</div>
            </section>
            <section>
              <Bet lockBet={lockBet} firstDeal={firstDeal} />
            </section>
            <section>
              <Hand
                whoseHand="dealer"
                hand={dealerHand}
                score={dealerScore}
                isHidden={isHidden}
                totalScore={totalScore}
              />
              <Hand
                whoseHand="player"
                hand={playerHand}
                score={playerScore}
                totalScore={totalScore}
              />
            </section>
            <section>
              <Controls hit={hit} stand={stand} isDealOn={isDealOn} />
            </section>
            <footer>
              <DisplayWinner winner={winner} />
            </footer>
          </main>
        </div>
      </>
    );
  }
}

export default Game;
