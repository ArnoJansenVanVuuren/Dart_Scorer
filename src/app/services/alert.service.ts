import { Injectable } from '@angular/core';
import { AlertButton, AlertController, AlertOptions } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  constructor(private alertController: AlertController) {}

  async presentAlertMultipleButtons(alertData: AlertOptions) {
    const alert = await this.alertController.create(alertData);

    await alert.present();
  }
}
