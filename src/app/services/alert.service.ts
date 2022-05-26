import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

export interface AlertButtonsI {
  name: string;
  type: string;
  label: string;
  value?: string;
  handler: any;
}

export interface AlertI {
  cssClass?: string;
  header: string;
  subHeader?: string;
  message: string;
  buttons: AlertButtonsI[];
}

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  constructor(private alertController: AlertController) {}

  async presentAlertMultipleButtons(alertData: AlertI) {
    const alert = await this.alertController.create({
      cssClass: alertData.cssClass,
      header: alertData.header,
      subHeader: alertData.subHeader,
      message: alertData.message,
      //buttons: alertData.buttons,
    });

    await alert.present();
  }
}
