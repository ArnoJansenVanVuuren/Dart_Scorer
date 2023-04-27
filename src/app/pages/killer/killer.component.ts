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

  constructor(
    private gameService: GameService,
    private router: Router,
    private modalController: ModalController,
    public toastController: ToastController,
    private alertService: AlertService
  ) {}

  ionViewWillEnter() {
    //-- if no player route back to select player
    if (!this.gameService?.gameInfo) {
      this.router.navigate(['players']);
      //--<> remove mock data
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
    }

    //-- get player info
    this.populatePlayerInfo();

    this.currentPlayerPreviousScore =
      this.playerGameStatus[this.playerNumber]?.score;

    this.winningDartCheck();
  }

  async presentToast(value: string) {
    const toast = await this.toastController.create({
      message: 'Sorry ' + value + ' you BUSTED',
      duration: 3000,
      position: 'top',
      color: 'danger',
    });
    toast.present();
  }

  async showDartSelection() {
    const modal = await this.modalController.create({
      component: DartScoringComponent,
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();

    this.processDartSelection(data as ScoreI);
  }

  populatePlayerInfo() {
    this.playerGameStatus = [];
    this.currentPlayer3DartScores = [];
    this.playerNumber = 0;
    this.gameService.gameInfo?.playerNames.forEach((name) => {
      if (name) {
        this.playerGameStatus.push({
          name,
          score: +this.gameService.gameInfo.gameVariant,
        });
      }
    });
    console.log('playerGameStatus', this.playerGameStatus);
    console.log('gameInfo', this.gameService.gameInfo);
  }

  processDartSelection(data: ScoreI) {
    this.currentPlayer3DartScores.push(data.value);
    if (
      this.playerGameStatus[this.playerNumber].score - data.value === 0 &&
      data.doubleCheck === true
    ) {
      this.playerGameStatus[this.playerNumber].score -= data.value;
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
      this.playerGameStatus[this.playerNumber].score - data.value <
      2
    ) {
      this.playerGameStatus[this.playerNumber].score =
        this.currentPlayerPreviousScore;
      this.presentToast(this.playerGameStatus[this.playerNumber].name);
      this.playerDone();
    } else {
      this.playerGameStatus[this.playerNumber].score -= data.value;
    }
    this.winningDartCheck();
  }

  winningDartCheck(): number {
    this.winningDart = this.playerGameStatus[this.playerNumber].score / 2;
    //--<> ERROR TypeError: Cannot read properties of undefined (reading 'score')
    if (!(this.winningDart - Math.floor(this.winningDart) === 0)) {
      this.winningDart = 0;
    }
    return this.winningDart;
  }

  //-- cycle through single players

  playerDone() {
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

  deleteFromArray(value: number) {
    this.playerGameStatus[this.playerNumber].score +=
      this.currentPlayer3DartScores[value];
    this.currentPlayer3DartScores.splice(value, 1);
    this.winningDartCheck();
  }
}
