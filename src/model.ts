interface Game {
  userScore: number;
  maxScore: number;
}

export const game: Game = {
  userScore: 0,
  maxScore: 7.5,
};

export enum Cards {
  as = 1,
  dos = 2,
  tres = 3,
  cuatro = 4,
  cinco = 5,
  seis = 6,
  siete = 7,
  sota = 10,
  caballo = 11,
  rey = 12,
}
