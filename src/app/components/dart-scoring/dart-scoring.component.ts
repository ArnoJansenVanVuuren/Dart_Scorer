import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-dart-scoring',
  templateUrl: './dart-scoring.component.html',
  styleUrls: ['./dart-scoring.component.scss'],
})
export class DartScoringComponent {
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

  valueSelected(value) {
    this.selectedValue = value;

    if (this.selectedValue === 0 || this.selectedValue > 20) {
      this.modalController.dismiss(this.selectedValue);
    }
    console.log('selected', this.selectedValue);
  }

  multiply(times) {
    console.log('times', times);
    this.selectedValue = this.selectedValue * times;
    console.log('multiply', this.selectedValue);
    this.modalController.dismiss(this.selectedValue);
    console.log('dismiss', this.selectedValue);
  }
}
