/**
 * Player component
 *
 * @file          players.component
 * @description   All data pertaining to the players and witch game the would like to play lives here
 * @author        Arno Jansen van Vuuren
 * @since         2023 - 05 - 21
 */


import { Component, OnInit } from '@angular/core';
import {
  UntypedFormGroup,
  UntypedFormBuilder,
  Validators,
  UntypedFormControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { GameInfoI, GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.scss'],
})
export class PlayersComponent implements OnInit {
  playerGameForm: UntypedFormGroup;
  playerArr: string[] = [];
  availablePlayers: { id: number; formName: string; validator?: string }[] = [
    { id: 1, formName: 'player1', validator: '' },
    { id: 2, formName: 'player2', validator: '' },
    { id: 3, formName: 'player3', validator: '' },
    { id: 4, formName: 'player4', validator: '' },
    { id: 5, formName: 'player5', validator: '' },
    { id: 6, formName: 'player6', validator: '' },
  ];
  availableGames: { name: string; path: string }[] = [
    { name: 'KILLER', path: '/killer' },
  ];

  /**----------------------------------------------------------------
   * @name  constructor
   */
  constructor(
    private fb: UntypedFormBuilder,
    private gameService: GameService,
    private router: Router
  ) {
    this.playerGameForm = this.fb.group({
      gameType: [null, Validators.required],
      playerQty: [null, Validators.required],
      gameVariant: [null, Validators.required],
      playerNames: this.fb.group({
        player1: null,
        player2: null,
        player3: null,
        player4: null,
        player5: null,
        player6: null,
      }),
    });
  }

  /**----------------------------------------------------------------
   * @name          ngOnInit
   * @description   Update various values on component initialization
   * @returns       {void}
   */
  ngOnInit(): void {
    //---<> clear all player data when new game is started
    console.log('player page game info', this.gameService.gameInfo);
  }

  /**----------------------------------------------------------------
   * @name          getPlayerNameControl
   * @description   Get player names
   * @param         {string} player
   * @returns       {UntypedFormControl}
   */
  getPlayerNameControl(player: string): UntypedFormControl {
    return (this.playerGameForm.get('playerNames') as UntypedFormGroup)
      .controls[player] as UntypedFormControl;
  }

  /**----------------------------------------------------------------
   * @name          changePlayerQty
   * @description   Change player quantity
   * @param         {number} qty
   * @returns       {void}
   */
  changePlayerQty(qty: number): void {
    this.playerGameForm.controls['playerQty'].setValue(qty);
    // set validators for player QTY
    this.availablePlayers.forEach((player) => {
      if (player.id <= qty) {
        this.getPlayerNameControl(player.formName).setValidators([
          Validators.required,
          Validators.minLength(4),
        ]);
      } else if (player.id > qty) {
        this.getPlayerNameControl(player.formName).clearValidators();
      }
      this.getPlayerNameControl(player.formName).updateValueAndValidity();
    });
  }

  /**----------------------------------------------------------------
   * @name          startGame
   * @description   Add all player info and game info into service and navigate to game
   * @returns       {void}
   */
  startGame(): void {
    const gameSendInfo: GameInfoI = {
      gameType: this.playerGameForm.value.gameType,
      gameVariant: this.playerGameForm.value.gameVariant,
      playerNames: Object.values(this.playerGameForm.value.playerNames),
    };
    //--- After promise set router link
    this.gameService.gameInfoReceive(gameSendInfo).then(() => {
      this.router.navigate([
        this.availableGames.filter(
          (game) => game.name === this.playerGameForm.value.gameType
        )[0].path,
      ]);
    });
  }
}
