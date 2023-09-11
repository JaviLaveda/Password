import { game } from "./model";

export const randomNumber = () => Math.floor(Math.random() * 10 + 1);

export const adjustValue = (value: number) => (value <= 7 ? value : value + 2);

export const assignScore = (value: number) => (value <= 7 ? value : 0.5);

export const addingScore = (value: number) => (game.userScore += value);
