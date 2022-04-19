import { Injectable } from '@angular/core';
import { promise } from 'protractor';

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

  gameInfoReceive(info: GameInfoI): Promise<void> {
    return new Promise((resolve) => {
      this.gameInfo = info;
      console.log('gameInfoReceive', info);
      resolve();
    });
  }
}
