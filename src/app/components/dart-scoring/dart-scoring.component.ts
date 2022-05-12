import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-dart-scoring',
  templateUrl: './dart-scoring.component.html',
  styleUrls: ['./dart-scoring.component.scss'],
})
export class DartScoringComponent implements OnInit {
  scoringValues: { id: number; name: string | number; value: number }[] = [];
  selectedValue: any;
  constructor(private modalController: ModalController) {}

  //--make sure array dart numbers are populated if not then populate
  ionViewWillEnter() {
    this.selectedValue = null;
    if (this.scoringValues.length === 0) {
      this.scoringValues.push({ id: 0, name: 'miss', value: 0 });

      for (let i = 1; i < 21; i++) {
        this.scoringValues.push({ id: i, name: i, value: i });
      }
      this.scoringValues.push(
        { id: 21, name: 'bull', value: 25 },
        { id: 22, name: 'cherry', value: 50 }
      );
    }
  }

  ngOnInit() {}

  valueSelected(value) {
    this.selectedValue = value;

    if (this.selectedValue === 0 || this.selectedValue > 20) {
      this.modalController.dismiss(this.selectedValue);
    }
    console.log('selected', this.selectedValue);
  }

  //--<> add check value is not zero or undefined
  multiply(value) {
    if (this.selectedValue >= 0) {
      console.log(value);
      this.selectedValue *= value;
      console.log('multiply', this.selectedValue);
    }
    this.modalController.dismiss(this.selectedValue);
    console.log('dismiss', this.selectedValue);
  }
}
