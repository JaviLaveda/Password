import "./style.css";

import { game } from "./model";

import {
  addingScore,
  adjustValue,
  assignScore,
  randomNumber,
  getImgCard,
  getStatusMessage,
  getResignMessage,
  getFutureMessageForScore,
} from "./motor";

import {
  showCard,
  showScore,
  showMessage,
  hiddingStatusText,
  disableButton,
  disableFutureButton,
  activateButton,
  activateFutureCardButton,
  activateNewGame,
  startGame,
} from "./ui";

//asking for another card
const askAnotherCard = () => {
  const randomValue = randomNumber();
  const cardNumber = adjustValue(randomValue);
  const imageCard = getImgCard(cardNumber);
  showCard(imageCard);
  const cardScore = assignScore(cardNumber);
  addingScore(cardScore);
  showScore();
  checkingStatus();
};

// checking game status
const checkingStatus = () => {
  if (game.userScore < game.maxScore) {
    keepPlaying();
  } else if (game.userScore === game.maxScore) {
    winGame();
  } else {
    gameOver();
  }
};

//keep playing message
const keepPlaying = () => {
  const message = getStatusMessage(game.userScore);
  showMessage(message);
};

//winning - FUNCTION
const winGame = () => {
  const message = getStatusMessage(game.userScore);
  showMessage(message);
  disableButton();
  activateNewGame();
};

//game over - FUNCTION
const gameOver = () => {
  const message = getStatusMessage(game.userScore);
  showMessage(message);
  disableButton();
  activateNewGame();
};

//resigning - FUNCTION
const resign = () => {
  hiddingStatusText();
  const message = getResignMessage(game.userScore);
  showMessage(message);
  disableButton();
  activateNewGame();
  activateFutureCardButton();
};

// NEW GAME - FUNCTION
const newGame = () => {
  game.userScore = 0;
  showScore();
  activateButton();
  hiddingStatusText();
  const imageCard = getImgCard(0);
  showCard(imageCard);
  disableFutureButton();
};

const futureCard = () => {
  hiddingStatusText();
  const randomValue = randomNumber();
  const cardNumber = adjustValue(randomValue);
  const imageCard = getImgCard(cardNumber);
  showCard(imageCard);
  const cardScore = assignScore(cardNumber);
  addingScore(cardScore);
  showScore();
  const message = getFutureMessageForScore(game.userScore);
  showMessage(message);
  disableFutureButton();
};

//BUTTONS - ADDEVENTLISTENERS
const events = () => {
  //asking for another card - BUTTON
  const btnAskCard = document.getElementById("askAnotherCard");
  if (btnAskCard && btnAskCard instanceof HTMLButtonElement) {
    btnAskCard.addEventListener("click", askAnotherCard);
  } else {
    throw new Error("ButtonElement not found");
  }
  //resigning - BUTTON
  const btnResign = document.getElementById("btnResign");
  if (btnResign && btnResign instanceof HTMLButtonElement) {
    btnResign.addEventListener("click", resign);
  } else {
    throw new Error("ButtonElement not found");
  }
  // NEW GAME - BUTTON
  const btnNewGame = document.getElementById("btnNewGame");
  if (btnNewGame && btnNewGame instanceof HTMLButtonElement) {
    btnNewGame.addEventListener("click", newGame);
  } else {
    throw new Error("ButtonElement not found");
  }
  // LAST CARD FUTURE - BUTTON
  const btnFutureCard = document.getElementById("btnFutureCard");
  if (btnFutureCard && btnFutureCard instanceof HTMLButtonElement) {
    btnFutureCard.addEventListener("click", futureCard);
  } else {
    throw new Error("ButtonElement not found");
  }
};

// DOMContentLoaded + Events*****************************************************
document.addEventListener("DOMContentLoaded", function () {
  startGame();
  events();
});
