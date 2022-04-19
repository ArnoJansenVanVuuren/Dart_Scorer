import { Component } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private gameService: GameService, private router: Router) {}
  ionViewWillEnter() {
    //get player info
    this.gameInfo = this.gameService.gameInfo;
    if (this.gameInfo && this.gameInfo.playerNames.length !== null) {
      console.log('ngOnInit:', this.gameService.gameInfo);
      this.gameInfo.playerNames.forEach((name) => {
        if (name) {
          console.log(name);
          this.playerGameStatus.push({
            name,
            score: +this.gameInfo.gameVariant,
          });
        }
      });
    } else {
      this.router.navigate(['players']);
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
  }
}
