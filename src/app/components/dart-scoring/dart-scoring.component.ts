/**
 * Dart Scoring
 *
 * @file          dart-scoring.component
 * @description   Component used to give player access the dart selectable scores
 * @author        Arno Jansen van Vuuren
 * @since         2023 - 04 - 27
 */

import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';

export interface ScoreI {
  value: number;
  doubleCheck: boolean;
}

@Component({
  selector: 'app-dart-scoring',
  templateUrl: './dart-scoring.component.html',
  styleUrls: ['./dart-scoring.component.scss'],
})
export class DartScoringComponent {
  scoringValues: { id: number; name: string | number; value: number }[] = [];
  selectedValue: any;

  /**----------------------------------------------------------------
   * @name  constructor
   */
  constructor(private modalController: ModalController) {}

  /**----------------------------------------------------------------
   * @name          ionViewWillEnter
   * @description   Update various values before the components view enters
   * @returns       {void}
   */
  ionViewWillEnter(): void {
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

  /**----------------------------------------------------------------
   * @name          valueSelected
   * @description   Save selected score
   * @param         {number} score Param1description
   * @returns       {void}
   */
  valueSelected(score: number): void {
    this.selectedValue = score;
    if (score === 0 || score > 20) {
      this.modalDismiss({
        value: score,
        doubleCheck: false,
      });
    }
  }

  /**----------------------------------------------------------------
   * @name          multiply
   * @description   Multiply score
   * @param         {number} multiplier Param1description
   * @returns       {void}
   */
  multiply(multiplier: number): void {
    let double;
    this.selectedValue *= multiplier;
    if (multiplier === 2) {
      double = true;
    } else {
      double = false;
    }
    this.modalDismiss({
      value: this.selectedValue,
      doubleCheck: double,
    });
  }

  /**----------------------------------------------------------------
   * @name          modalDismiss
   * @description   Close modal when selection is done
   * @param         {ScoreI} score Param2description
   * @returns       {void}
   */
  modalDismiss(score: ScoreI): void {
    this.modalController.dismiss(score);
  }
}
