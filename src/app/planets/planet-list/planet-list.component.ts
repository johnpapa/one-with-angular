import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MdSnackBar, MdSnackBarConfig } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { Planet, ConfigService, DataService } from '../../core';
import { ActionsService } from '../../core/actions.service';
import { CharactersState } from '../../core/reducers.service';

@Component({
  selector: 'ro-planet-list',
  templateUrl: './planet-list.component.html',
  styleUrls: ['./planet-list.component.scss']
})
export class PlanetListComponent implements OnInit {
  title = 'Planets';
  planets: Observable<Planet[]>;
  selectedPlanet: Planet;

  constructor(
    public snackBar: MdSnackBar,
    private configService: ConfigService,
    private dataService: DataService,
    private router: Router,
    private actionsService: ActionsService,
    private store: Store<CharactersState>,
  ) { }

  ngOnInit() {
    this.planets = this.store.select('planets');

    this.planets.subscribe(
      () => this.snackBar.open('Getting Planets data succeeded', 'HTTP', this.configService.snackConfig),
      () => this.snackBar.open('Getting Planets data failed', 'ERROR', this.configService.snackConfig)
    );

    this.store.dispatch(this.actionsService.getCharacters());
  }

  selectPlanet(planet: Planet) {
    this.selectedPlanet = planet;
    this.router.navigate(['planets', planet.id]);
    console.log(planet);
  }
}
