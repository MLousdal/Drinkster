export enum Guess {
  Under,
  Over,
}

export interface IGong {
  active: boolean;
  beers: number;
  players: number;
  time: string;
  sipSize: number;
}