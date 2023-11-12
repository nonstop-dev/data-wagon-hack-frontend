import { Component, Input, OnInit, OnChanges } from '@angular/core';
import * as L from 'leaflet';
import { icon, Marker } from 'leaflet';
import 'leaflet-providers';
import { IStation, IWagon } from 'src/app/services/types';

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
  @Input() wagons: IWagon[] = [];
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

  private latlngs: L.LatLngExpression[] = [];

  private stationIcon = new L.Icon({
    iconUrl: 'assets/train_station.svg',
    iconSize: [50, 50],
    iconAnchor: [25, 25],
  });

  private wagonIcon = new L.Icon({
    iconUrl: 'assets/wagon.svg',
    iconSize: [64, 64],
    iconAnchor: [32, 32],
  });

  private wagonEmptyIcon = new L.Icon({
    iconUrl: '',
    iconSize: [64, 64],
    iconAnchor: [32, 32],
  });

  private wagonBlackIcon = new L.Icon({
    iconUrl: 'assets/wagon_black.svg',
    iconSize: [64, 64],
    iconAnchor: [32, 32],
  });

  constructor() {}

  ngOnInit(): void {
    this.initMap();
  }

  ngOnChanges(): void {
    this.drawStations();
    this.drawWagons();
  }

  private drawStations() {
    if (!this.stations || this.stations.length == 0) return;

    this.stations
      .filter(station => station.latitude != null && station.longitude != null)
      .map(station => {
        this.latlngs.push([station.latitude, station.longitude]);
        return L.marker([station.latitude, station.longitude] as L.LatLngExpression, {
          icon: this.stationIcon,
          title: `${station.name} ${station.id}`,
        });
      })
      .forEach(x => x.addTo(this.map));
    this.latlngs.length = this.latlngs.length - 25;
    var polyline = L.polyline(this.latlngs, { color: '#55B7A0', weight: 7 }).addTo(this.map);
  }

  private drawWagons() {
    if (!this.wagons || this.wagons.length == 0) return;

    this.wagons
      .filter(wagon => wagon.latitude != null && wagon.longitude != null)
      .map(wagon =>
        L.marker([wagon.latitude, wagon.longitude] as L.LatLngExpression, {
          icon: wagon.isPgk ? this.wagonIcon : this.wagonBlackIcon,
        }).on('click', () => {
          alert('ВЫПУСТИ МЕНЯ!');
        })
      )
      .forEach(x => x.addTo(this.map));
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: [54.80863, 35.79416],
      zoom: 12,
      attributionControl: false,
    });

    this.tileLayer.addTo(this.map);
  }
}
