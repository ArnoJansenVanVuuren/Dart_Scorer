import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-dart-scoring',
  templateUrl: './dart-scoring.component.html',
  styleUrls: ['./dart-scoring.component.scss'],
})
export class DartScoringComponent implements OnInit {
  scoringValues: { id: number; name: string | number; value: number }[] = [];
  selectedValue: any = 0;
  constructor(private modalController: ModalController) {}

  //--make sure array dart numbers are populated if not then populate
  ionViewWillEnter() {
    if (this.scoringValues.length === 0) {
      this.scoringValues.push({ id: 0, name: 'miss', value: 0 });

      for (let i = 1; i < 21; i++) {
        this.scoringValues.push({ id: i, name: i, value: i });
      }
      this.scoringValues.push(
        { id: 21, name: 'bull', value: 25 },
        { id: 22, name: 'cherry', value: 50 }
      );
      console.log(this.scoringValues);
    }
  }

  ngOnInit() {}

  valueSelected(value) {
    this.selectedValue = value;
    console.log('selected', this.selectedValue);
  }
  dismiss(value) {
    this.selectedValue = this.selectedValue * value;
    this.modalController.dismiss(this.selectedValue);
  }
}
