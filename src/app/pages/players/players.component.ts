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
  Validators,
  UntypedFormControl,
  FormGroup,
  FormControl,
  FormArray,
} from '@angular/forms';
import { Router } from '@angular/router';
import { GameInfoI, GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.scss'],
})
export class PlayersComponent implements OnInit {
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

  //--- Forms
  playerGameForm = new FormGroup({
    gameType: new FormControl<'KILLER' | null>(null, {
      validators: Validators.required,
    }), //---<> simplify form control type
    playerQty: new FormControl(0, { nonNullable: true }),
    gameVariant: new FormControl<string | null>(null),
    playerNames: new FormArray<FormControl<string>>([], {
      validators: [Validators.required, Validators.minLength(4)],
    }),
  });

  /**----------------------------------------------------------------
   * @name  constructor
   */
  constructor(
    private gameService: GameService,
    private readonly router: Router
  ) {}

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
    this.playerGameForm.controls.playerQty.setValue(qty);
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
    const { gameType, gameVariant, playerNames } =
      this.playerGameForm.getRawValue();
    let gameSendInfo: GameInfoI;
    //--- Check if all data exists
    if (gameType && gameVariant && playerNames.length > 0) {
      gameSendInfo = {
        gameType,
        gameVariant,
        playerNames,
      };
      //--- After promise set router link
      this.gameService.gameInfoReceive(gameSendInfo).then(() => {
        this.router.navigate([
          this.availableGames.filter(
            (game) => game.name === this.playerGameForm.value.gameType
          )[0].path,
        ]);
      });
    } else {
      //---<> handle error
    }
  }
}
