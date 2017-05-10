import { Component, OnInit } from '@angular/core';
import { MdSnackBar, MdSnackBarConfig } from '@angular/material';

import { Planet, ConfigService, DataService } from '../../core';

@Component({
  selector: 'ro-planets',
  templateUrl: './planets.component.html',
  styleUrls: ['./planets.component.scss']
})
export class PlanetsComponent implements OnInit {
  title = 'Planets';
  planets: Planet[];
  selectedPlanet: Planet;

  constructor(public snackBar: MdSnackBar,
    private configService: ConfigService,
    private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getPlanets()
      .subscribe(
        planets => this.planets = planets,
        () => this.snackBar.open('Planets failed!', 'ERROR', this.configService.snackConfig),
        () => this.snackBar.open('Planets Loaded!', 'HTTP', this.configService.snackConfig)
      );
  }

  selectPlanet(planet: Planet) {
    this.selectedPlanet = planet;
  };
}
