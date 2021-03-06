import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { Http } from "@angular/http";
import { GenericGeoJSONFeatureCollection } from "@yaga/generic-geojson";
import { CircleMarkerDirective } from "@yaga/leaflet-ng2";
import { Point } from "geojson";
import { Point as LeafletPoint } from "leaflet";

import { gradients } from './gradients';
import { ShuttleService } from "../../app/shuttle.service";

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
export class HomePage implements AfterViewInit {
  public tileUrl: string = "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
  public readonly startLat: number = 50.855;
  public readonly startLng: number = 7.071;
  public readonly startZoom: number = 10;

  public pois: GenericGeoJSONFeatureCollection<Point, IGeoDataProperties> = {
    features: [],
    type: "FeatureCollection",
  };
  public time: number;
  public gradients = gradients;

  @ViewChild(CircleMarkerDirective)
  public cirlceMarker: CircleMarkerDirective<any>;

  constructor(
      private http: Http,
      private shuttleService: ShuttleService,
  ) {
    this.http.request("assets/pois.geojson")
        .subscribe((event): void => {
          this.pois = event.json() as GenericGeoJSONFeatureCollection<Point, IGeoDataProperties>;
        });
    this.shuttleService.shuttleTimeEvent.subscribe(value => this.time);
    this.time = this.shuttleService.calcShuttleMinute();
  }

  public parsePoint(str: string, divisor: number = 1): LeafletPoint {
    const splittedValues: [string, string] = str.split("x") as [string, string];
    return new LeafletPoint(
        parseInt(splittedValues[0], 10) / divisor,
        parseInt(splittedValues[1], 10) / divisor
    );
  }

  public ngAfterViewInit() {
    this.cirlceMarker.openTooltip();
  }
}
