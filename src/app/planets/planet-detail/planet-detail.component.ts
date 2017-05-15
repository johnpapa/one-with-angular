import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MdSnackBar } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { ConfigService, DataService, Planet } from '../../core';
import { CharactersState } from '../../core/reducers.service';
import { ActionsService } from '../../core/actions.service';

@Component({
  selector: 'ro-planet-detail',
  templateUrl: './planet-detail.component.html',
  styleUrls: ['./planet-detail.component.scss']
})
export class PlanetDetailComponent implements OnInit {
  planet: Planet;
  planets: Observable<Planet[]>;
  revealModel = false;

  constructor(
    private dataService: DataService,
    private snackBar: MdSnackBar,
    private configService: ConfigService,
    private actionsService: ActionsService,
    private route: ActivatedRoute,
    private store: Store<CharactersState>,
  ) { }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.planets = this.store.select('planets');

    this.store.dispatch(this.actionsService.getPlanets());

    this.route.params.map(params => parseInt(params['id'], 10))
      .subscribe(id => {
        this.planets.subscribe(
          planets => {
            const planet = planets.find(p => p.id === +id);
            this.planet = planet;
          }
        );
      },
      () => this.snackBar.open('Getting Planets and Allegiances failed', 'ERROR', this.configService.snackConfig),
      () => this.snackBar.open('Getting Planets and Allegiances succeeded', 'HTTP', this.configService.snackConfig)
      );
  }
}
