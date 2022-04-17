import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.scss'],
})
export class PlayersComponent implements OnInit, OnDestroy {
  playerGameForm: FormGroup;
  playerArr: string[] = [];
  availablePlayers: number[] = [1, 2, 3, 4, 5, 6];

  constructor(private fb: FormBuilder) {
    this.playerGameForm = this.fb.group({
      gameType: ['killer', Validators.required],
      playerQty: [null, Validators.required],
      killerVal: [null, Validators.required],
    });
  }

  ngOnInit() {}

  ngOnDestroy(): void {}
}
