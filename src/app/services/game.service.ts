import { Injectable } from '@angular/core';

export interface GameInfoI {
  gameType: string;
  gameVariant: string;
  playerNames: string[];
}

@Injectable({
  providedIn: 'root',
})
export class GameService {
  gameInfo: GameInfoI;
  constructor() {}

  gameInfoReceive(info: GameInfoI) {
    this.gameInfo = info;
  }
}
