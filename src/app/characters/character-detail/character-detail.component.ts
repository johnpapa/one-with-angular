import { Component, OnChanges, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MdSnackBar } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { CharactersState } from '../../core/reducers.service';
import { ActionsService } from '../../core/actions.service';
import { Character, ConfigService, DataService, Planet } from '../../core';

@Component({
  selector: 'ro-character-detail',
  templateUrl: './character-detail.component.html',
  styleUrls: ['./character-detail.component.scss']
})
export class CharacterDetailComponent implements OnChanges {
  @Input() character: Character;
  homeWorld: Planet;
  planets: Observable<Planet[]>;
  // planets: Planet[];
  ready = false;
  allegiances: Observable<string[]>;
  // allegiances: string[];
  revealModel = false;

  constructor(
    public snackBar: MdSnackBar,
    private configService: ConfigService,
    private dataService: DataService,
    private actionsService: ActionsService,
    private store: Store<CharactersState>
  ) { }

  ngOnChanges() {
    this.getData();
  }

  getData() {
    this.ready = false;

    this.planets = this.store.select('planets');
    this.allegiances = this.store.select('allegiances');

    this.store.dispatch(this.actionsService.getPlanets());
    this.store.dispatch(this.actionsService.getAllegiances());

    Observable.forkJoin(this.planets, this.allegiances)
      // Observable.forkJoin(this.dataService.getPlanets(), this.dataService.getAllegiances())
      .subscribe(
        (summaries) => {
          // this.planets = summaries[0];
          // this.allegiances = summaries[1];
          this.syncHomeWorld(summaries[0]);
          this.ready = true;
        }
      // TODO: fix errors this raises
      // ,
      // () => this.snackBar.open('Getting Planets and Allegiances failed', 'ERROR', this.configService.snackConfig),
      // () => this.snackBar.open('Getting Planets and Allegiances succeeded', 'HTTP', this.configService.snackConfig)
      );
  }

  get icon() {
    let iconName = '';
    if (this.character && this.character.allegiance) {
      iconName = `${this.character.allegiance.replace(' ', '-')}-icon`;
    }
    return iconName;
  }

  syncHomeWorld(planets: Planet[]) {
    if (this.character) {
      const homeWorld = planets.find((planet => this.character.homeWorldId === planet.id));
      this.character.homeWorld = homeWorld;
    }
  }
}
