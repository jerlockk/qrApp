import { Component } from '@angular/core';
// plugin cordova
import { Platform, ModalController} from 'ionic-angular';
// Pages
import { ModalPage } from '../index.pages';
import {HistoryProvider} from "../../providers/history/history";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  modalPage: any;
  constructor(private platform: Platform,
              private modalCtrl: ModalController,
              private historyP: HistoryProvider) {
    this.modalPage = ModalPage;
  }

  public scan() {
    if (!this.platform.is('cordova')) {
      // alert('Platform not accepted');
      this.historyP.getHistory('geo: 4.601632, -74.16634799999997').then(res => console.log(res));
      return;
    }
    this.showCamera();
    this.modalCtrl.create(this.modalPage)
      .present();
  }

  public showCamera() {
    (window.document.querySelector('ion-app') as HTMLElement).classList.add('cameraView');
  }
}
