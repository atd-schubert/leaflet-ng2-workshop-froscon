import { Component } from '@angular/core';
import { Http } from "@angular/http";
import { GenericGeoJSONFeatureCollection } from "@yaga/generic-geojson";
import { Point } from "geojson";

interface IGeoDataProperties {
  id: number;
  name: string;
  link: string;
  icon: string;
  iconSize: string;
  town: string;
  street: string;
  phone: string;
}

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public tileUrl: string = "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
  public readonly startLat: number = 50.855;
  public readonly startLng: number = 7.071;
  public readonly startZoom: number = 10;

  public pois: GenericGeoJSONFeatureCollection<Point, IGeoDataProperties> = {
    features: [],
    type: "FeatureCollection",
  };

  constructor(
      private http: Http,
  ) {
    this.http.request("assets/pois.geojson")
        .subscribe((event): void => {
          this.pois = event.json() as GenericGeoJSONFeatureCollection<Point, IGeoDataProperties>;
        });
  }

}
