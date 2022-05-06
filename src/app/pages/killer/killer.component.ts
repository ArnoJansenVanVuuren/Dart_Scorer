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
    } else {
      //--this.router.navigate(['players']);
    }
  }

  //--<> add button to remove one of the selections

  async presentModal() {
    const modal = await this.modalController.create({
      component: DartScoringComponent,
    });
    await modal.present();

    const { data } = await modal.onWillDismiss();
    console.log('from modal:', data);

    //--<> this only works on the second go after the score was already < 0

    if ((this.playerGameStatus[this.playerNumber].score -= data) < 0) {
      const dartSum = this.currentPlayer3DartScores.reduce(
        (sumValue, currentValue) => {
          return sumValue + currentValue;
        },
        0
      );
      console.log('dartsum:', dartSum);
      this.playerGameStatus[this.playerNumber].score += dartSum;
      this.playerDone();
    } else {
      this.currentPlayer3DartScores.push(data);
      this.playerGameStatus[this.playerNumber].score -= data;
      console.log(this.currentPlayer3DartScores);
    }
  }

  playerDone() {
    console.log('playerDone:', this.playerGameStatus);
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
}
