import { Component, OnInit } from '@angular/core';
import { MdSnackBar, MdSnackBarConfig } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { Planet, ConfigService, DataService } from '../../core';
import { ActionsService } from '../../core/actions.service';
import { PlanetsState } from '../../core/reducers.service';

@Component({
  selector: 'ro-planets',
  templateUrl: './planets.component.html',
  styleUrls: ['./planets.component.scss']
})
export class PlanetsComponent implements OnInit {
  title = 'Planets';
  planets: Observable<Planet[]>;
  // planets: Planet[];
  selectedPlanet: Planet;

  constructor(public snackBar: MdSnackBar,
    private configService: ConfigService,
    private dataService: DataService,
    private actionsService: ActionsService,
    private store: Store<PlanetsState>
  ) { }

  ngOnInit() {
    this.planets = this.store.select('planets');

    this.planets.subscribe(
        () => this.snackBar.open('Planets failed!', 'ERROR', this.configService.snackConfig),
        () => this.snackBar.open('Planets Loaded!', 'HTTP', this.configService.snackConfig)
    );

    this.store.dispatch(this.actionsService.getPlanets());
  }

  selectPlanet(planet: Planet) {
    this.selectedPlanet = planet;
  };
}
