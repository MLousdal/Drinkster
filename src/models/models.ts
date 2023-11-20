export enum Guess {
  Under,
  Over,
}

export enum BoozeType {
  Beer = "beer",
  Shots = "shots",
}

export interface IGong {
  active: boolean;
  beers: number;
  players: number;
  time: string;
  sipSize: number;
}