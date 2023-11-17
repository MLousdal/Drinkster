export enum Guess {
  Under,
  Over,
}

export interface IDong {
  active: boolean;
  beers: number;
  players: number;
  time: string;
  sipSize: number;
}