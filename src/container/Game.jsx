import React, { Component } from 'react';

import { Money } from '../components/Money/Money';

import Bet from '../components/Bet/Bet';
import { Hand } from '../components/Hand/Hand';
import { Controls } from '../components/Controls/Controls';
import { DisplayWinner } from '../components/DisplayWinner/DisplayWinner';
import { Logo } from '../components/Logo/Logo';

import './Game.css';

/**
 * Renders:
 * Splash Component (includes Logo & play button)
 * Logo
 * Money Component (player's bet and total money)
 * Bet Component (bet controls)
 * Hand Component (dealer's hand)
 * Hand Component (players's hand)
 * Control Component (hit or stand)
 * DisplayWinner Component
 */
class Game extends Component {
  constructor() {
    super();
    /**
     * @property {Array} deck - shuffled 52 cards
     * @property {Boolean} string - dealer, player, or push
     * @property {Array} dealerHand, playerHand - array of cards (objects)
     * @property {Object} dealerScore, playerScore - totals of hand - {hardTotals, softTotals}
     * @property {Boolean} isGameOn - indication if the player has press 'start new game' - if true, player can bet
     * @property {Integer} betAmount - amount of money that player has bet
     * @property {Boolean} isBetLocked - when player press 'place bet' - allows cards to be dealt
     * @property {Integer} totalMoney - player's total money, defualt is 100
     * @property {Boolean} isDealOn - indication that deal has been started (set to true when player hits 'Deal' button)
     * @property {Boolean} isHidden - indication that dealer second card should not be seen. Set to false when player stands or bust
     * @property {Integer} rounds - indication of rounds, will re-deal after every 4 rounds
     */
    this.state = {
      deck: [],
      winner: null,
      dealerHand: [],
      playerHand: [],
      dealerScore: { hardScore: 0, softScore: 0 },
      playerScore: { hardScore: 0, softScore: 0 },
      isGameOn: false,
      betAmount: 0,
      isBetLocked: false,
      totalMoney: 100,
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

  /**
   * creation of shuffled deck
   */
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

  /**
   * @param {Integer} amount - from Bet component
   * checks if amount is valid - if not return out
   * cannot re-bet, bet more than total money, and bet is not 0
   */
  lockBet(amount) {
    const { isGameOn, isBetLocked, totalMoney } = this.state;
    if (
      !isGameOn ||
      isBetLocked ||
      Number.isNaN(amount) ||
      amount > totalMoney ||
      amount === 0
    )
      return;
    this.setState((prevState) => ({
      betAmount: amount,
      totalMoney: prevState.totalMoney - amount,
      isBetLocked: true,
      isHidden: true,
      dealerHand: [], // need to reset hand on new round
      playerHand: [], // need to reset hand on new round
      dealerScore: { hardScore: 0, softScore: 0 }, // need to reset score on new round
      playerScore: { hardScore: 0, softScore: 0 }, // need to reset score on new round
    }));
  }

  /**
   * method to remove and return a card from the deck
   */
  deal() {
    const { deck } = this.state;
    const card = deck.pop();
    return card;
  }

  /**
   * @param {Object} score - current hand score { hardtotal, softTotal }
   * @param {Object} card - new card that is passed into hand { suit, value }
   * based on new card being passed in - we will update our score
   */
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

  /**
   *
   * @param {Object} score - player or dealer score { hardScore, softScore }
   * returns the total score
   */
  totalScore(score) {
    if (score.hardScore === 21 || score.softScore === 21) return 21;
    if (score.softScore > 21) return score.hardScore;

    return score.softScore;
  }

  /**
   *
   * @param {String} playerOrDealer - string of either 'dealer' or 'player'
   * updates the player's or dealer's score based on the new card
   * updates the player's or dealer's hand with the new card
   */
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
        // checks if player bust - auto run after set state
        if (playerOrDealer === 'Dealer') return;
        const playerHitScore = this.totalScore(playerScore);
        if (playerHitScore > 21) {
          this.stand();
        }
      }
    );
  }

  /**
   *
   * @param {String} winner - 'dealer', 'player', or 'PUSH'
   * function adds or subtract money based on if player wins
   */
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

  /**
   * function to deal two cards to player and dealer
   */
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
        // checks if - on first deal both dealer and player have blackjack
        if (dealerTotalScore === 21 && playerTotalScore === 21) {
          this.winner('Push');
          return;
        }
        // if dealer gets blackjack and NOT player on first deal - dealer wins
        if (dealerTotalScore === 21) {
          this.winner('Dealer');
          return;
        }
        // if player gets blackjack and NOT dealer on first deal - player wins
        // the reason why we stand is because dealer has to be at soft 17
        if (playerTotalScore === 21) {
          this.stand();
        }
      }
    );
  }

  /**
   * function that decides winner of hands
   */
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

  /**
   * function to be run after Hit
   */
  stand() {
    const { isDealOn, dealerScore } = this.state;
    if (!isDealOn) return; // if isDealOn is set to false - will return out
    const dealerTotalScore = this.totalScore(dealerScore);
    // if dealer's total score is under soft 17 - will recurse
    if (dealerTotalScore < 17) {
      this.hit('Dealer');
      this.stand();
    }
    // once dealer is at or over soft 17 - determines the winner or push
    const whoWon = this.results();
    // update winner on who won;
    this.winner(whoWon);
  }

  /**
   * function to reset state for new round - except player's money, and increments round
   * re-shuffle's deck every 4th round
   */
  newRound() {
    this.setState(
      (prevState) => ({
        rounds: prevState.rounds + 1,
        isGameOn: true, // allows for a new bet to be placed
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
      winner,
      rounds,
    } = this.state;
    const { lockBet, firstDeal, totalScore, hit, stand } = this;

    // start game button
    let startButton = (
      <button type="submit" id="start-button" onClick={() => this.createDeck()}>
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
        <button
          type="submit"
          id="new-round-button"
          onClick={() => this.newRound()}
        >
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
