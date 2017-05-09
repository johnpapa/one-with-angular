import { Component, OnInit } from '@angular/core';
import { MdSnackBar, MdSnackBarConfig } from '@angular/material';

import { Planet } from '../../core/models/planet';
import { DataService } from '../../core/data.service';

@Component({
  selector: 'ro-planets',
  templateUrl: './planets.component.html',
  styleUrls: ['./planets.component.scss']
})
export class PlanetsComponent implements OnInit {
  title = 'Planets';
  planets: Planet[];
  selectedPlanet: Planet;

  constructor(public snackBar: MdSnackBar, private dataService: DataService) { }

  ngOnInit() {
    const config = new MdSnackBarConfig();
    config.duration = 2500;

    this.dataService.getPlanets()
      .subscribe(
        planets => this.planets = planets,
        () => this.snackBar.open('Planets failed!', 'ERROR', config),
        () => this.snackBar.open('Planets Loaded!', 'HTTP', config)
      );
  }

  selectPlanet(planet: Planet) {
    this.selectedPlanet = planet;
  };
}
