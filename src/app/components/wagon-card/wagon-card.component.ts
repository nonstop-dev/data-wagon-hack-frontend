import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-wagon-card',
  templateUrl: './wagon-card.component.html',
  styleUrls: ['./wagon-card.component.scss'],
})
export class WagonCardComponent implements OnInit {
  constructor(protected mainService: MainService) {}
  public currTemplate = '';

  ngOnInit(): void {}
}
