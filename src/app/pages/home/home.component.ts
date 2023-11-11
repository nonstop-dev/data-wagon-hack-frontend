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
    private readonly mainService: MainService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.mainService
      .getStations({ page: 10, size: 500 })
      .pipe(first())
      .subscribe((stations: IStation[]) => {
        this.stations = stations;
        // console.log(stations);
        this.cdr.markForCheck();
      });

    this.mainService
      .getWagons({ page: 0, size: 15000 })
      .pipe(first())
      .subscribe(wagons => {
        console.log(wagons);
        this.wagons = wagons;
        this.cdr.markForCheck();
      });
  }
}
