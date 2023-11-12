import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { first } from 'rxjs';
import { MainService } from 'src/app/services/main.service';
import { IStation, IWagon } from 'src/app/services/types';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  stations: IStation[] = [];
  wagons: IWagon[] = [];

  constructor(
    protected mainService: MainService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.mainService
      //   .searchStations({ latitude: 55.75863343136711, longitude: 37.63416378863461, radius: 0.07 })
      .searchStations({ latitude: 54.81593, longitude: 35.79416, radius: 0.65 })
      .pipe(first())
      .subscribe((stations: IStation[]) => {
        this.stations = stations;
        console.log(stations);
        this.cdr.markForCheck();
      });

    // this.mainService
    //   .getWagons({ page: 0, size: 1000 })
    //   .pipe(first())
    //   .subscribe(wagons => {
    //     console.log(wagons);
    //     this.wagons = wagons;
    //     this.cdr.markForCheck();
    //   });
    const lat = 54.901;
    const lon = 35.658;
    this.wagons = [
      {
        arrivalTime: 'Wed, 30 Aug 2023 01:02:00 GMT',
        latitude: lat,
        longitude: lon,
        stationId: 7475,
        trainDeparturePoint: '7475',
        trainDestinationPoint: '62',
        trainNumber: '335',
        wagonDestination: 61,
        wagonId: 5266,
        isPgk: true,
      },
      {
        arrivalTime: 'Wed, 30 Aug 2023 05:26:00 GMT',
        latitude: lat - 0.01,
        longitude: lon + 0.015,
        stationId: 63,
        trainDeparturePoint: '7475',
        trainDestinationPoint: '62',
        trainNumber: '335',
        wagonDestination: 61,
        wagonId: 5266,
        isPgk: true,
      },
      {
        arrivalTime: 'Wed, 30 Aug 2023 05:05:00 GMT',
        latitude: lat - 0.02,
        longitude: lon + 0.03,
        stationId: 7475,
        trainDeparturePoint: '7475',
        trainDestinationPoint: '62',
        trainNumber: '335',
        wagonDestination: 61,
        wagonId: 5266,
      },
      {
        arrivalTime: 'Mon, 28 Aug 2023 23:45:00 GMT',
        latitude: lat - 0.03,
        longitude: lon + 0.045,
        stationId: 7475,
        trainDeparturePoint: '6999',
        trainDestinationPoint: '7475',
        trainNumber: '471',
        wagonDestination: 61,
        wagonId: 5266,
        isPgk: true,
      },
    ];
  }
}
