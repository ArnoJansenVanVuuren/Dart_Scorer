import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dart-scoring',
  templateUrl: './dart-scoring.component.html',
  styleUrls: ['./dart-scoring.component.scss'],
})
export class DartScoringComponent implements OnInit {
  scoringValues: { id: number; name: string | number; value: number }[] = [
    { id: 21, name: 'bull', value: 25 },
    { id: 22, name: 'cherry', value: 50 },
  ];

  constructor() {}

  ionViewWillEnter() {
    if (this.scoringValues.length < 3) {
      for (let i = 0; i < 21; i++) {
        this.scoringValues.push({ id: i, name: i, value: i });
      }
    }
    console.log(this.scoringValues);
  }

  ngOnInit() {}
}
