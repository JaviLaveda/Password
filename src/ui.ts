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

const showCard = (urlCard: string) => {
  const imgElement = document.getElementById("newCard");
  if (imgElement && imgElement instanceof HTMLImageElement) {
    imgElement.src = urlCard;
  } else {
    throw new Error("imgElement not found");
  }
};

const showScore = () => {
  const scoreElement = document.getElementById("score");
  if (scoreElement && scoreElement instanceof HTMLHeadingElement) {
    scoreElement.textContent = game.userScore.toString().padStart(2, "0");
  } else {
    throw new Error("HeadingElement not found");
  }
};

const showMessage = (text: string) => {
  const statusTextElement = document.getElementById("status");
  if (statusTextElement && statusTextElement instanceof HTMLParagraphElement) {
    statusTextElement.textContent = text;
  } else {
    throw new Error("ParagraphElement not found");
  }
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
const hiddingStatusText = () => {
  const statusText = document.getElementById("status");
  if (statusText && statusText instanceof HTMLParagraphElement) {
    statusText.textContent = "";
  } else {
    throw new Error("statusText not found");
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
export const events = () => {
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
//disabling buttons
const disableButton = () => {
  const btnAskCard = document.getElementById("askAnotherCard");
  if (btnAskCard && btnAskCard instanceof HTMLButtonElement) {
    btnAskCard.disabled = true;
  } else {
    throw new Error("ButtonElement not found");
  }
  const btnResign = document.getElementById("btnResign");
  if (btnResign && btnResign instanceof HTMLButtonElement) {
    btnResign.disabled = true;
  } else {
    throw new Error("ButtonElement not found");
  }
};

const disableFutureButton = () => {
  const btnFutureCard = document.getElementById("btnFutureCard");
  if (btnFutureCard && btnFutureCard instanceof HTMLButtonElement) {
    btnFutureCard.style.display = "none";
  } else {
    throw new Error("ButtonElement not found");
  }
};
//activating buttons
const activateButton = () => {
  const btnAskCard = document.getElementById("askAnotherCard");
  if (btnAskCard && btnAskCard instanceof HTMLButtonElement) {
    btnAskCard.disabled = false;
  } else {
    throw new Error("ButtonElement not found");
  }
  const btnResign = document.getElementById("btnResign");
  if (btnResign && btnResign instanceof HTMLButtonElement) {
    btnResign.disabled = false;
  } else {
    throw new Error("ButtonElement not found");
  }
  const btnNewGame = document.getElementById("btnNewGame");
  if (btnNewGame && btnNewGame instanceof HTMLButtonElement) {
    btnNewGame.style.display = "none";
  } else {
    throw new Error("ButtonElement not found");
  }
};

const activateNewGame = () => {
  const btnNewGame = document.getElementById("btnNewGame");
  if (btnNewGame && btnNewGame instanceof HTMLButtonElement) {
    btnNewGame.style.display = "block";
  }
};
const activateFutureCardButton = () => {
  const btnFutureCard = document.getElementById("btnFutureCard");
  if (btnFutureCard && btnFutureCard instanceof HTMLButtonElement) {
    btnFutureCard.style.display = "block";
  } else {
    throw new Error("ButtonElement not found");
  }
};

export const startGame = () => {
  game.userScore = 0;
  game.maxScore = 7.5;
  showScore();
};
