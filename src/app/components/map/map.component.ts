import { Component, Input, OnInit, OnChanges } from '@angular/core';
import * as L from 'leaflet';
import { icon, Marker } from 'leaflet';
import 'leaflet-providers';
import { IStation } from 'src/app/services/types';

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
export class MapComponent implements OnInit, OnChanges {
  @Input() stations: IStation[] = [];
  private map: L.Map | any;
  //   private tileLayer: L.TileLayer = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  //     maxZoom: 19,
  //     minZoom: 10,
  //   });
  private tileLayer: L.TileLayer = L.tileLayer.provider('Jawg.Light', {
    accessToken: 'C7gpY3hd8wFbr1I9RcIsT2yJHjZKNIheFeAHBcpmlcaSX5LcZUle3xCueZHL1A7y',
  });

  // in case of fire this is free and works without an api key
  // L.tileLayer.provider('Stadia.AlidadeSmooth').addTo(this.map);

  private stationIcon = new L.Icon({
    iconUrl: 'assets/ic_round-train.svg',
    iconSize: [50, 50],
    iconAnchor: [25, 25],
  });

  constructor() {}

  ngOnInit(): void {
    this.initMap();
  }

  ngOnChanges(): void {
    this.drawMarkers();
  }

  private drawMarkers() {
    if (!this.stations || this.stations.length == 0) return;

    this.stations
      .filter(station => station.latitude != null && station.longitude != null)
      .map(station => [station.latitude, station.longitude])
      .map(station => L.marker(station as L.LatLngExpression, { icon: this.stationIcon }))
      .forEach(x => x.addTo(this.map));
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: [54.0993, 34.3649],
      zoom: 12,
      attributionControl: false,
    });

    this.tileLayer.addTo(this.map);
  }
}
