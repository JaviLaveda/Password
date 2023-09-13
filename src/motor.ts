import { game, Cards } from "./model";

export const randomNumber = () => Math.floor(Math.random() * 10 + 1);

export const adjustValue = (value: number) => (value <= 7 ? value : value + 2);

export const assignScore = (value: number) => (value <= 7 ? value : 0.5);

export const addingScore = (value: number) => (game.userScore += value);

export const getImgCard = (cardValue: number): string => {
  return cardValue !== 0
    ? `https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/${cardValue}_${Cards[cardValue]}-copas.jpg`
    : "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/back.jpg";
};

export const getStatusMessage = (score: number): string => {
  if (score < game.maxScore) {
    return "¡Sigue jugando!";
  } else if (score === game.maxScore) {
    return "¡Lo has clavado!¡Enhorabuena!";
  } else if (score > game.maxScore) {
    return "¡GAME OVER!";
  } else {
    return "";
  }
};

export const getResignMessage = (score: number): string => {
  if (score <= 4) {
    return "¡Has sido muy conservador!";
  } else if (score > 4 && score <= 5) {
    return "¡Te ha entrado el canguelo eh!";
  } else if (score > 5 && score < 7.5) {
    return "¡Uyyy!¡Casi casi!";
  } else {
    return "";
  }
};

export const getFutureMessageForScore = (score: number): string => {
  if (score > game.maxScore) {
    return "¡Has hecho bien!¡Habrías perdido!";
  } else if (score === game.maxScore) {
    return "¡Qué pena!¡Habrías ganado!";
  } else if (score < game.maxScore) {
    return "¡Qué pena!¡Estarías más cerca!";
  } else {
    return "";
  }
};
