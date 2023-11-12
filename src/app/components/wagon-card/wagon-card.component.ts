import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-wagon-card',
  templateUrl: './wagon-card.component.html',
  styleUrls: ['./wagon-card.component.scss'],
})
export class WagonCardComponent implements OnInit {
  constructor() {}
  public currTemplate = 'train';

  ngOnInit(): void {}
}
