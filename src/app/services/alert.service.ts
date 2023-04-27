/**
 * Alert Service
 *
 * @file          alert.service
 * @description   Service used to create alerts
 * @author        Arno Jansen van Vuuren
 * @since         2023 - 04 - 27
 * @usage         import { AlertService } from 'src/app/services/alert.service';
 *                this.AlertService.presentAlertMultipleButtons(*insert your alert options here*)
 */

import { Injectable } from '@angular/core';
import { AlertController, AlertOptions } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  constructor(private alertController: AlertController) {}

  async presentAlertMultipleButtons(alertData: AlertOptions) {
    const alert = await this.alertController.create(alertData);
    alert.present();
  }
}
