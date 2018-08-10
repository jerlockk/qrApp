import { Injectable } from '@angular/core';
import { ScanData } from '../../models/scan-data.model';
import { ModalController } from "ionic-angular";
// Plugin Cordova
import { InAppBrowser } from '@ionic-native/in-app-browser';
// Pages
import { MapPage } from "../../pages/index.pages";

@Injectable()
export class HistoryProvider {
  readonly _history: ScanData[];
  message: string;
  mapPage: any;

  constructor(private iab: InAppBrowser,
              private modalCtrl: ModalController) {
    this._history = [];
    this.message = '';
    this.mapPage = MapPage;
  }

  sendHistory(){
    return this._history;
  }

  getHistory(text: string) {
    let data = new ScanData(text);
    this._history.unshift(data);
    return this.actionScan(0);
  }

  actionScan(index:number) {
    let scanData = this._history[index];
    switch (scanData.type) {
      case 'http':
          this.message = 'Opening browser';
          setTimeout(() => {
            this.iab.create(scanData.info, '_system');
          }, 800);
        break;

      case 'map':
        this.message = 'Opening map';
        setTimeout(() => {
          this.modalCtrl.create(this.mapPage, { coords: scanData.info })
            .present();
        }, 800);
        break;

      default:
        this.message = 'Action not found';
        break;
    }
    return new Promise((resolve, reject) => {
      resolve(this.message);
    })
  }
}
