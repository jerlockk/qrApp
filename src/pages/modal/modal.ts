import { Component } from '@angular/core';
// Plugins Cordova
import { ToastController, ViewController } from 'ionic-angular';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';
// Providers
import { HistoryProvider } from '../../providers/history/history';

@Component({
  selector: 'page-modal',
  templateUrl: 'modal.html',
})
export class ModalPage {
  scanSub: any;
  camera: number;
  constructor(private viewCtrl: ViewController,
              private qrScanner: QRScanner,
              private toastCtrl: ToastController,
              private historyP: HistoryProvider) {
    this.camera = 0;
  }

  ionViewWillEnter() {
    this.scan();
  }

  public scan(): void {
    this.qrScanner.prepare()
      .then((status: QRScannerStatus) => {
        if (status.authorized) {
          this.scanSub = this.qrScanner.scan()
            .subscribe((text: string) => {
              this.historyP.getHistory(text)
                .then((result: string) => {
                  this.showToast(result);
                });
                setTimeout(() => {
                  this.closeModal();
                }, 800);
            });
          this.qrScanner.show();
        } else {
          this.showToast('denied authorization');
        }
      })
      .catch((e: any) => this.showToast(e));
  }

  public showToast(message: string): void {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 1000,
      position: 'middle'
    });
    toast.present();
  }

  public closeModal(): void {
    this.scanSub.unsubscribe();
    this.qrScanner.hide();
    this.qrScanner.destroy();
    (window.document.querySelector('ion-app') as HTMLElement).classList.remove('cameraView');
    this.viewCtrl.dismiss();
  }

  public rotateCamera(): void {
    this.camera === 0 ? this.camera = 1 : this.camera = 0;
    this.qrScanner.useCamera(this.camera);
  }
}
