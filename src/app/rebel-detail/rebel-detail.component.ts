import { Component, OnInit, Input } from '@angular/core';

import { Rebel } from '../rebel';
import { Planet } from '../planet';
import { DataService } from '../data.service';

@Component({
  selector: 'ro-rebel-detail',
  templateUrl: './rebel-detail.component.html',
  styleUrls: ['./rebel-detail.component.scss']
})
export class RebelDetailComponent implements OnInit {
  @Input() rebel: Rebel;
  planets: Planet[];
  revealModel = false;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getPlanets()
      // .then(planets => this.planets = planets);
      .subscribe(planets => this.planets = planets);
  }

}
