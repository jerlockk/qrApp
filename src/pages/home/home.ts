import { Component } from '@angular/core';
// plugin cordova
import { Platform, ModalController} from 'ionic-angular';
// Pages
import { ModalPage } from '../index.pages';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  modalPage: any;
  constructor(private platform: Platform,
              private modalCtrl: ModalController) {
    this.modalPage = ModalPage;
  }

  public scan() {
    if (!this.platform.is('cordova')) {
      alert('Platform not accepted');
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
