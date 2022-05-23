import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { GameInfoI, GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.scss'],
})
export class PlayersComponent implements OnInit {
  playerGameForm: FormGroup;
  playerArr: string[] = [];
  availablePlayers: { id: number; formName: string; validator?: string }[] = [
    { id: 1, formName: 'player1', validator: '' },
    { id: 2, formName: 'player2', validator: '' },
    { id: 3, formName: 'player3', validator: '' },
    { id: 4, formName: 'player4', validator: '' },
    { id: 5, formName: 'player5', validator: '' },
    { id: 6, formName: 'player6', validator: '' },
  ];
  availableGames: { name: string; path: string }[] = [
    { name: 'KILLER', path: '/killer' },
  ];

  constructor(
    private fb: FormBuilder,
    private gameService: GameService,
    private router: Router
  ) {
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
  ngOnInit(): void {
    //--<> clear all player data when new game is started
  }

  getPlayerNameControl(player: string): FormControl {
    return (this.playerGameForm.get('playerNames') as FormGroup).controls[
      player
    ] as FormControl;
  }

  changePlayerQty(qty: number) {
    this.playerGameForm.controls.playerQty.setValue(qty);

    // set validators for player QTY

    this.availablePlayers.forEach((player) => {
      if (player.id <= qty) {
        this.getPlayerNameControl(player.formName).setValidators([
          Validators.required,
          Validators.minLength(4),
        ]);
        this.getPlayerNameControl(player.formName).updateValueAndValidity();
      }
    });
  }

  // add all player info and game info into service

  startGame() {
    const promise = new Promise((resolve, reject) => {});
    const gameSendInfo: GameInfoI = {
      gameType: this.playerGameForm.value.gameType,
      gameVariant: this.playerGameForm.value.gameVariant,
      playerNames: [
        this.playerGameForm.value.playerNames.player1,
        this.playerGameForm.value.playerNames.player2,
        this.playerGameForm.value.playerNames.player3,
        this.playerGameForm.value.playerNames.player4,
        this.playerGameForm.value.playerNames.player5,
        this.playerGameForm.value.playerNames.player6,
      ], //---<>dynamic way you insert into []
    };

    // after promise set router link

    this.gameService.gameInfoReceive(gameSendInfo).then(() => {
      this.router.navigate([
        this.availableGames.filter(
          (game) => game.name === this.playerGameForm.value.gameType
        )[0].path,
      ]);
    });
  }
}
