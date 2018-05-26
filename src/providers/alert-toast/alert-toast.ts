import { AlertController, ToastController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class AlertToastProvider {

  constructor(public http: HttpClient, private alertCtrl: AlertController, private toastCtrl:ToastController) {
    console.log('Hello AlertToastProvider Provider');
  }

  showAddedBeerAlert() {
    let alert = this.alertCtrl.create({
      title: 'Added Beer',
      subTitle: 'Thank you!',
      buttons: ['OK']
    });
    alert.present();
  }

  showAddedBeerToast(){
    let toast = this.toastCtrl.create({
      message: 'Beer was added successfully',
      duration: 2000,
      position: 'top'
    });
    toast.present();
  }



}
