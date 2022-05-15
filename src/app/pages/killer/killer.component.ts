import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { DartScoringComponent } from 'src/app/components/dart-scoring/dart-scoring.component';
import { GameInfoI, GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-killer',
  templateUrl: './killer.component.html',
  styleUrls: ['./killer.component.scss'],
})
export class KillerComponent {
  gameInfo: GameInfoI;
  playerGameStatus: {
    name: string;
    score: number;
  }[] = [];
  playerNumber = 0;
  currentPlayer3DartScores = [];
  currentPlayerPreviousScore: number;

  constructor(
    private gameService: GameService,
    private router: Router,
    private modalController: ModalController
  ) {}

  ionViewWillEnter() {
    //--get player info

    this.gameInfo = this.gameService.gameInfo;
    if (this.gameInfo && this.gameInfo.playerNames.length !== null) {
      this.gameInfo.playerNames.forEach((name) => {
        if (name) {
          this.playerGameStatus.push({
            name,
            score: +this.gameInfo.gameVariant,
          });
        }
      });
    }

    //-- if no player rout back to select player
    else {
      this.playerGameStatus = [
        {
          name: 'arno',
          score: 80,
        },
      ];
      //--this.router.navigate(['players']);
    }
    this.currentPlayerPreviousScore =
      this.playerGameStatus[this.playerNumber].score;
  }

  //--<> add button to remove one of the selections

  async presentModal() {
    const modal = await this.modalController.create({
      component: DartScoringComponent,
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();

    this.currentPlayer3DartScores.push(data.value);
    if (
      this.playerGameStatus[this.playerNumber].score - data.value === 0 &&
      data.doubleCheck == true
    ) {
      this.router.navigate(['players']);
    } else if (
      this.playerGameStatus[this.playerNumber].score - data.value <
      2
    ) {
      this.playerGameStatus[this.playerNumber].score =
        this.currentPlayerPreviousScore;
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

  deleteFromArray(value) {
    this.currentPlayer3DartScores.splice(value, 1);
  }
}
