import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public tileUrl: string = "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
  public readonly startLat: number = 50.855;
  public readonly startLng: number = 7.071;
  public readonly startZoom: number = 10;

  constructor(public navCtrl: NavController) {

  }

}
