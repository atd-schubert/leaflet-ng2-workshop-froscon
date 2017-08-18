import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public tileUrl: string = "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

  constructor(public navCtrl: NavController) {

  }

}
