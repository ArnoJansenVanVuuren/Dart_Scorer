import { Component, OnInit } from '@angular/core';
import { GameInfoI, GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-killer',
  templateUrl: './killer.component.html',
  styleUrls: ['./killer.component.scss'],
})
export class KillerComponent implements OnInit {
  gameInfo: GameInfoI;
  playerGameStatus: {
    name: string;
    score: number;
  }[] = [];

  constructor(private gameService: GameService) {}

  ngOnInit() {
    //get player info
    this.gameInfo = this.gameService.gameInfo;
    if (this.gameInfo && this.gameInfo.playerNames.length !== 0) {
      this.gameInfo.playerNames.forEach((name) => {
        console.log(name);
        this.playerGameStatus.push({
          name,
          score: +this.gameInfo.gameVariant,
        });
      });
    } else {
      //---<> rout to player page
    }
  }
  playerDone() {
    console.log(this.playerGameStatus);
  }
}
