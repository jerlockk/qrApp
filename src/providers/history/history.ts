import { Injectable } from '@angular/core';
import { ScanData } from '../../models/scan-data.model';
// Plugin Cordova
import { InAppBrowser } from '@ionic-native/in-app-browser';

@Injectable()
export class HistoryProvider {
  readonly _history: ScanData[];
  message: string;

  constructor(private iab: InAppBrowser) {
    this._history = [];
    this.message = '';
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
          }, 1000);
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
