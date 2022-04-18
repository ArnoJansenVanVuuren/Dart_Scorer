import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GameInfoI, GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.scss'],
})
export class PlayersComponent implements OnInit, OnDestroy {
  playerGameForm: FormGroup;
  playerArr: string[] = [];
  availablePlayers: { id: number; formName: string }[] = [
    { id: 1, formName: 'player1' },
    { id: 2, formName: 'player2' },
    { id: 3, formName: 'player3' },
    { id: 4, formName: 'player4' },
    { id: 5, formName: 'player5' },
    { id: 6, formName: 'player6' },
  ];
  availableGames: { name: string; path: string }[] = [
    { name: 'KILLER', path: '/killer' },
  ];
  routerLinkChange: string;

  constructor(private fb: FormBuilder, private gameService: GameService) {
    this.playerGameForm = this.fb.group({
      gameType: [null, Validators.required],
      playerQty: [null, Validators.required],
      gameVariant: [null, Validators.required],
      playerNames: this.fb.group({
        player1: null,
        player2: null,
        player3: null,
        player4: null,
        player5: null,
        player6: null,
      }),
    });
  }

  changePlayerQty(qty) {
    this.playerGameForm.controls.playerQty.setValue(qty);
  }

  startGame() {
    const gameSendInfo: GameInfoI = {
      gameType: this.playerGameForm.value.gameType,
      gameVariant: this.playerGameForm.value.gameVariant,
      playerNames: ['arno', 'piet'],
    };
    this.gameService.gameInfoReceive(gameSendInfo);
    this.routerLinkChange = this.availableGames.filter(
      (game) => game.name === this.playerGameForm.value.gameType
    )[0].path;
  }

  ngOnInit() {}

  ngOnDestroy(): void {}
}
