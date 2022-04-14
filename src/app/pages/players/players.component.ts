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
  killSub: Subscription;

  constructor(private fb: FormBuilder) {
    this.playerGameForm = this.fb.group({
      playerQty: [null, Validators.required],
      killerVal: [null, Validators.required],
    });
  }

  ngOnInit() {
    //---subscribe to player QTY changes
    this.killSub =
      this.playerGameForm.controls.playerQty.valueChanges.subscribe((val) => {
        //---clear player array
        this.playerArr = [];
        //---add '' for QTY of players
        for (let i = 0; i < val; i++) {
          this.playerArr.push('' + i);
        }
        console.log(this.playerArr);
      });
  }

  ngOnDestroy(): void {
    this.killSub.unsubscribe();
  }
}
