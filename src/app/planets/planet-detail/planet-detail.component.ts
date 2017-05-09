import { Component, Input } from '@angular/core';

import { Planet, DataService } from '../../core';

@Component({
  selector: 'ro-planet-detail',
  templateUrl: './planet-detail.component.html',
  styleUrls: ['./planet-detail.component.scss']
})
export class PlanetDetailComponent {
  @Input() planet: Planet;
  revealModel = false;

  constructor(private dataService: DataService) { }
}
