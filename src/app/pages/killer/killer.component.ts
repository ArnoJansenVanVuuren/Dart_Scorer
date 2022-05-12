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
  currentPlayerPreviousScore;

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
      this.playerGameStatus = [
        {
          name: 'arno',
          score: 301,
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
    console.log('from modal:', data);

    //--<> this only works on the second go after the score was already < 0

    this.currentPlayer3DartScores.push(data);

    if ((this.playerGameStatus[this.playerNumber].score -= data) < 2) {
      this.playerGameStatus[this.playerNumber].score =
        this.currentPlayerPreviousScore;
      this.playerDone();
    } else {
      this.playerGameStatus[this.playerNumber].score -= data;
      console.log(this.currentPlayer3DartScores);
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
}
