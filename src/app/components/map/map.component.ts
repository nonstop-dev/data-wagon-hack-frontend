import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { icon, Marker } from 'leaflet';
import 'leaflet-providers';

const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';
const iconDefault = icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41],
});
Marker.prototype.options.icon = iconDefault;
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  private map: L.Map | any;
  private centroid: L.LatLngExpression = [54.0993, 34.3649];

  private initMap(): void {
    this.map = L.map('map', {
      center: this.centroid,
      zoom: 12,
      attributionControl: false,
    });

    const tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      minZoom: 10,
    });

    // const jittery = Array(5)
    //   .fill(this.centroid)
    //   .map(x => [x[0] + (Math.random() - 0.5) / 10, x[1] + (Math.random() - 0.5) / 10])
    //   .map(x => L.marker(x as L.LatLngExpression))
    //   .forEach(x => x.addTo(this.map));
    // const drawnItems = L.featureGroup().addTo(this.map);
    tiles.addTo(this.map);

    L.tileLayer
      .provider('Jawg.Light', {
        accessToken: 'C7gpY3hd8wFbr1I9RcIsT2yJHjZKNIheFeAHBcpmlcaSX5LcZUle3xCueZHL1A7y',
      })
      .addTo(this.map);

    // in case of fire this is free and works without an api key
    // L.tileLayer.provider('Stadia.AlidadeSmooth').addTo(this.map);
  }

  constructor() {}

  ngOnInit(): void {
    this.initMap();
  }
}
