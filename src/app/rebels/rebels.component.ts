import { Component, OnInit } from '@angular/core';

import { Rebel } from '../rebel';
import { DataService } from '../data.service';

@Component({
  selector: 'ro-rebels',
  templateUrl: './rebels.component.html',
  styleUrls: ['./rebels.component.scss']
})
export class RebelsComponent implements OnInit {
  title = 'Rebels';
  rebels: Rebel[];
  selectedRebel: Rebel;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getRebels()
      .subscribe(rebels => this.rebels = rebels);
      // .then(rebels => this.rebels = rebels);
  }

  selectRebel(rebel: Rebel) {
    this.selectedRebel = rebel;
  };
}
