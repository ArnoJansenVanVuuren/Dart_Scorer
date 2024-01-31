/**
 * Game Service
 *
 * @file          game.service
 * @description   Service used for all game info interactions
 * @author        Arno Jansen van Vuuren
 * @since         2023 - 04 - 27
 */

import { Injectable } from '@angular/core';

/**==============================================
 * @interface     GameInfoI
 * @description   Describes all info needed for a single game
 */
export interface GameInfoI {
  gameType: 'KILLER';
  gameVariant: string;
  playerNames: (string | null)[];
}

@Injectable({
  providedIn: 'root',
})
export class GameService {
  gameInfo!: GameInfoI;

  /**----------------------------------------------------------------
   * @name          gameInfoReceive
   * @description   Promise made to insure that data is filled
   * @param         {GameInfoI} info
   * @returns       {Promise<void>}
   */
  gameInfoReceive(info: GameInfoI): Promise<void> {
    return new Promise((resolve) => {
      this.gameInfo = info;
      resolve();
    });
  }
}
