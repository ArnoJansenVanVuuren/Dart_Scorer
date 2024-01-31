/**
 * Killer Game Component
 *
 * @file          killer.component
 * @description   Code and logic for players to play the killer dart game
 * @author        Arno Jansen van Vuuren
 * @since         2023 - 05 - 21
 */

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import {
  DartScoringComponent,
  ScoreI,
} from 'src/app/components/dart-scoring/dart-scoring.component';
import { GameService } from 'src/app/services/game.service';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-killer',
  templateUrl: './killer.component.html',
  styleUrls: ['./killer.component.scss'],
})
export class KillerComponent {
  playerGameStatus: {
    name: string;
    score: number;
  }[] = [];
  playerNumber = 0;
  currentPlayer3DartScores: number[] = [];
  currentPlayerPreviousScore = 0;
  winningDart = 0;

  /**----------------------------------------------------------------
   * @name  constructor
   */
  constructor(
    private gameService: GameService,
    private router: Router,
    private modalController: ModalController,
    public toastController: ToastController,
    private alertService: AlertService
  ) {}

  /**----------------------------------------------------------------
   * @name          ionViewWillEnter
   * @description   Update various values before the components view enters
   * @returns       {void}
   */
  ionViewWillEnter(): void {
    console.log('gameInfo', this.gameService.gameInfo);

    //-- if no player route back to select player
    if (!this.gameService?.gameInfo) {
      this.router.navigate(['players']);
      //---<> remove mock data
      // this.playerGameStatus.push(
      //   {
      //     name: 'arno',
      //     score: 40,
      //   },
      //   {
      //     name: 'pieter',
      //     score: 60,
      //   }
      // );
      //---<> remove mock data
    }
    //--- Get player info
    this.populatePlayerInfo();
    //--- Update visible score
    this.currentPlayerPreviousScore =
      this.playerGameStatus[this.playerNumber]?.score;
    //--- Check if the player is able to finnish the game
    this.winningDartCheck();
  }

  /**----------------------------------------------------------------
   * @name          presentToast
   * @description   Show a toast if payer busted
   * @param         {string} playerName
   * @returns       {Promise<void>}
   */
  //---<> maybe move to service to create toasts dynamically
  async presentToast(playerName: string): Promise<void> {
    const toast = await this.toastController.create({
      message: 'Sorry ' + playerName + ' you BUSTED',
      duration: 3000,
      position: 'top',
      color: 'danger',
    });
    toast.present();
  }

  /**----------------------------------------------------------------
   * @name          showDartSelectionModal
   * @description   Show modal where player can select the score
   * @returns       {Promise<void>}
   */
  async showDartSelectionModal(): Promise<void> {
    const modal = await this.modalController.create({
      component: DartScoringComponent,
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();

    this.processDartSelection(data as ScoreI);
  }

  /**----------------------------------------------------------------
   * @name          populatePlayerInfo
   * @description   Populate current players info
   * @returns       {void}
   */
  populatePlayerInfo(): void {
    this.playerGameStatus = [];
    this.currentPlayer3DartScores = [];
    this.playerNumber = 0;
    // this.gameService.gameInfo?.playerNames.forEach((name) => {
    //   if (name) {
    //     this.playerGameStatus.push({
    //       name,
    //       score: +this.gameService.gameInfo.gameVariant,
    //     });
    //   }
    // });
    console.log('playerGameStatus', this.playerGameStatus);
    console.log('gameInfo', this.gameService.gameInfo);
  }

  /**----------------------------------------------------------------
   * @name          winningDartCheck
   * @description   Check if players score can be made with one dart(double)
   * @returns       {number}
   */
  winningDartCheck(): number {
    this.winningDart = this.playerGameStatus[this.playerNumber].score / 2;
    //--<> ERROR TypeError: Cannot read properties of undefined (reading 'score')
    if (!(this.winningDart - Math.floor(this.winningDart) === 0)) {
      this.winningDart = 0;
    }
    return this.winningDart;
  }

  /**----------------------------------------------------------------
   * @name          processDartSelection
   * @description   Process the selected dart to know the next step
   * @param         {ScoreI} score Param1description
   * @returns       {void}
   */
  processDartSelection(score: ScoreI): void {
    this.currentPlayer3DartScores.push(score.value);
    if (
      this.playerGameStatus[this.playerNumber].score - score.value === 0 &&
      score.doubleCheck === true
    ) {
      this.playerGameStatus[this.playerNumber].score -= score.value;
      this.alertService.presentAlertMultipleButtons({
        header: 'WINNER',
        subHeader: this.playerGameStatus[this.playerNumber].name,
        message: 'You are the winner congratulations',
        backdropDismiss: false,
        buttons: [
          {
            text: 'New Game',
            handler: () => {
              this.router.navigate(['players']);
            },
          },
          {
            text: 'Rematch',
            handler: () => {
              this.populatePlayerInfo();
            },
          },
        ],
      });
    } else if (
      this.playerGameStatus[this.playerNumber].score - score.value <
      2
    ) {
      this.playerGameStatus[this.playerNumber].score =
        this.currentPlayerPreviousScore;
      this.presentToast(this.playerGameStatus[this.playerNumber].name);
      this.playerDone();
    } else {
      this.playerGameStatus[this.playerNumber].score -= score.value;
    }
    this.winningDartCheck();
  }

  /**----------------------------------------------------------------
   * @name          playerDone
   * @description   Move onto the next player
   * @returns       {void}
   */
  playerDone(): void {
    if (
      this.playerGameStatus.length !== 0 &&
      this.playerNumber < this.playerGameStatus.length - 1
    ) {
      this.playerNumber++;
    } else {
      this.playerNumber = 0;
    }
    this.currentPlayer3DartScores = [];
    this.winningDart = 0;
    this.currentPlayerPreviousScore =
      this.playerGameStatus[this.playerNumber]?.score;
  }

  /**----------------------------------------------------------------
   * @name          deleteScore
   * @description   Delete one score form players selected scores
   * @param         {number} value
   * @returns       {void}
   */
  deleteScore(value: number): void {
    this.playerGameStatus[this.playerNumber].score +=
      this.currentPlayer3DartScores[value];
    this.currentPlayer3DartScores.splice(value, 1);
    this.winningDartCheck();
  }
}
