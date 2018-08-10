import { Component } from '@angular/core';
import { NavParams, ViewController } from "ionic-angular";

@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {
  latitude: number;
  longitude: number;
  constructor(private viewCtrl: ViewController,
              private navParams: NavParams) {
    const coords = this.navParams.get("coords").split(',');
    this.latitude = Number(coords[0].replace('geo:', ''));
    this.longitude = Number(coords[1]);
  }

  public closeModal(): void {
    this.viewCtrl.dismiss();
  }


}
