import { Component } from '@angular/core';
// Provider
import { HistoryProvider } from "../../providers/history/history";
import {ScanData} from "../../models/scan-data.model";

@Component({
  selector: 'page-saved',
  templateUrl: 'saved.html',
})
export class SavedPage {
  history: ScanData[];
  constructor(private historyProvider: HistoryProvider) {
    this.history = [];
  }

  ionViewDidLoad() {
    this.history = this.historyProvider.sendHistory();
  }

  public openScan(index: number) {
    this.historyProvider.actionScan(index);
  }
}
