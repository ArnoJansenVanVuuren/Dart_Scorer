import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-dart-scoring',
  templateUrl: './dart-scoring.component.html',
  styleUrls: ['./dart-scoring.component.scss'],
})
export class DartScoringComponent implements OnInit {
  scoringValues: { id: number; name: string | number; value: number }[] = [];

  constructor(private modalController: ModalController) {}

  ionViewWillEnter() {
    if (this.scoringValues.length === 0) {
      for (let i = 0; i < 21; i++) {
        this.scoringValues.push({ id: i, name: i, value: i });
      }
      this.scoringValues.push(
        { id: 21, name: 'bull', value: 25 },
        { id: 22, name: 'cherry', value: 50 }
      );
    }
  }

  ngOnInit() {}

  dismiss(value) {
    this.modalController.dismiss(value);
  }
}
