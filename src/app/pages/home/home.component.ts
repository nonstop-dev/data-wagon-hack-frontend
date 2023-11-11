import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private readonly mainService: MainService) {}

  ngOnInit(): void {
      this.mainService.getStations().subscribe((resp) => console.log(resp));
  }
}
