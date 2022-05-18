import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import {
  DartScoringComponent,
  ScoreI,
} from 'src/app/components/dart-scoring/dart-scoring.component';
import { GameInfoI, GameService } from 'src/app/services/game.service';

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
  currentPlayerPreviousScore: number = 0;
  toastSelection?: string;

  constructor(
    private gameService: GameService,
    private router: Router,
    private modalController: ModalController,
    public toastController: ToastController
  ) {}

  ionViewWillEnter() {
    //-- if no player route back to select player
    if (!this.gameService.gameInfo) {
      this.router.navigate(['players']);
    }

    //-- get player info
    this.gameService.gameInfo.playerNames.forEach((name) => {
      if (name) {
        this.playerGameStatus.push({
          name,
          score: +this.gameService.gameInfo.gameVariant,
        });
      }
    });

    this.currentPlayerPreviousScore =
      this.playerGameStatus[this.playerNumber].score;
  }

  async presentToast(value: string) {
    if (this.toastSelection === 'bust') {
      const toast = await this.toastController.create({
        message: 'Sorry ' + value + ' you BUSTED',
        duration: 2500,
        position: 'top',
        color: 'danger',
      });
      toast.present();
    } else if (this.toastSelection === 'win') {
      const toast = await this.toastController.create({
        message: value + ' is the WINNER!',
        position: 'top',
        color: 'success',
        buttons: [
          {
            side: 'end',
            text: 'New Game',
            handler: () => {
              this.router.navigate(['players']);
            },
          },
          {
            text: 'Done',
            role: 'cancel',
            handler: () => {
              this.router.navigate(['welcome']);
            },
          },
        ],
      });
      toast.present();
    }
  }
  async showDartSelection() {
    const modal = await this.modalController.create({
      component: DartScoringComponent,
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();

    this.processDartSelection(data as ScoreI);
  }

  processDartSelection(data: ScoreI) {
    this.currentPlayer3DartScores.push(data.value);
    if (
      this.playerGameStatus[this.playerNumber].score - data.value === 0 &&
      data.doubleCheck == true
    ) {
      this.playerGameStatus[this.playerNumber].score -= data.value;
      this.toastSelection = 'win';
      this.presentToast(this.playerGameStatus[this.playerNumber].name);
    } else if (
      this.playerGameStatus[this.playerNumber].score - data.value <
      2
    ) {
      this.playerGameStatus[this.playerNumber].score =
        this.currentPlayerPreviousScore;
      this.toastSelection = 'bust';
      this.presentToast(this.playerGameStatus[this.playerNumber].name);
      this.playerDone();
    } else {
      this.playerGameStatus[this.playerNumber].score -= data.value;
    }
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
  }

  deleteFromArray(value: number) {
    this.playerGameStatus[this.playerNumber].score +=
      this.currentPlayer3DartScores[value];
    this.currentPlayer3DartScores.splice(value, 1);
  }
}
