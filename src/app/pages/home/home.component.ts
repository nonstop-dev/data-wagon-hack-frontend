import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/services/main.service';
import { IStation } from 'src/app/services/types';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  stations: IStation[] = [];

  constructor(
    private readonly mainService: MainService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.mainService.getStations().subscribe((stations: IStation[]) => {
      this.stations = stations;
      console.log(stations);
      this.cdr.markForCheck();
    });
    // this.mainService.getStationById(32).subscribe(resp => console.log(resp));
    // this.mainService.getWagons({ page: 2, size: 100 }).subscribe(resp => console.log(resp));
  }
}
