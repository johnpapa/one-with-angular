import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { MdSnackBar, MdSnackBarConfig } from '@angular/material';
import { Subscription } from 'rxjs/Subscription';

import { Planet, ConfigService, DataService } from '../../core';

@Component({
  selector: 'ro-planet-list',
  templateUrl: './planet-list.component.html',
  styleUrls: ['./planet-list.component.scss']
})
export class PlanetListComponent implements OnDestroy, OnInit {
  title = 'Planets';
  planets: Planet[];
  selectedPlanet: Planet;

  // Prevent memory leaks with the unsubscribe pattern
  // This is best when the component has only one subscribe
  private subscription: Subscription;

  constructor(
    public snackBar: MdSnackBar,
    private configService: ConfigService,
    private dataService: DataService,
    private router: Router
  ) {}

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngOnInit() {
    this.subscription = this.dataService.getPlanets().subscribe(planets => {
      this.planets = planets;
      // TODO: fix this this.snackBar.open('Getting Planets data succeeded', 'SUCCESS', this.configService.snackConfig);
    });
    // TODO: fix this () => this.snackBar.open('Getting Planets data failed', 'ERROR', this.configService.snackConfig)
  }

  selectPlanet(planet: Planet) {
    this.selectedPlanet = planet;
    this.router.navigate(['planets', planet.id]);
    console.log(planet);
  }
}
