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

const gamesC = [
  {
    name: 'KILLER',
    path: '/killer',
  },
] as const;

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.scss'],
})
export class PlayersComponent implements OnInit {
  games = gamesC; //---<> check if necessary

  //---<> form validation nor working properly
  //--- Forms
  playerGameForm = new FormGroup({
    gameType: new FormControl<(typeof gamesC)[number]['name'] | null>(null, {
      validators: Validators.required,
    }),
    gameVariant: new FormControl<string | null>(null),
    playerNames: new FormArray<FormControl<string | null>>(
      [new FormControl(null, { validators: Validators.required })],
      {
        validators: [Validators.required],
      }
    ),
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
   * @name          addPlayer
   * @description   Add a extra player
   * @returns       {void}
   */
  addPlayer(): void {
    this.playerGameForm.controls.playerNames.controls.push(
      new FormControl(null, { validators: Validators.required })
    ); //---<> push form control
    console.log(this.playerGameForm);
    console.log(this.playerGameForm.value);

    console.log(this.playerGameForm.valid);
  }

  /**----------------------------------------------------------------
   * @name          getPlayerNameControl
   * @description   Get player names
   * @param         {string} player
   * @returns       {UntypedFormControl}
   */
  getPlayerNameControl(player: string): UntypedFormControl {
    return (this.playerGameForm.get('playerNames') as UntypedFormGroup) //---<> check type
      .controls[player] as UntypedFormControl;
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
          gamesC.filter(
            (game) => game.name === this.playerGameForm.value.gameType
          )[0].path,
        ]);
      });
    } else {
      //---<> handle error
    }
  }
}
