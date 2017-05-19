import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MdSnackBar, MdSnackBarConfig } from '@angular/material';

import { Planet, ConfigService, DataService } from '../../core';

@Component({
  selector: 'ro-planet-list',
  templateUrl: './planet-list.component.html',
  styleUrls: ['./planet-list.component.scss']
})
export class PlanetListComponent implements OnInit {
  title = 'Planets';
  planets: Planet[];
  selectedPlanet: Planet;

  constructor(
    public snackBar: MdSnackBar,
    private configService: ConfigService,
    private dataService: DataService,
    private router: Router,
  ) { }

  ngOnInit() {
    // console.log(Date.now());
    this.dataService.getPlanets()
      .subscribe(planets => {
        // console.log(Date.now());
        this.planets = planets;
        this.snackBar.open('Getting Planets data succeeded', 'SUCCESS', this.configService.snackConfig);
        // console.log(Date.now());
  },
      () => this.snackBar.open('Getting Planets data failed', 'ERROR', this.configService.snackConfig)
      );
  }

  selectPlanet(planet: Planet) {
    this.selectedPlanet = planet;
    this.router.navigate(['planets', planet.id]);
    console.log(planet);
  }

  // trackByPlanets(index: number, planet: Planet) {
  //   return planet.id;
  // }
}
