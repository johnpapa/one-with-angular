import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MdSnackBar } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import 'rxjs/add/observable/combineLatest';

import { CharactersState } from '../../core/reducers.service';
import { ActionsService } from '../../core/actions.service';
import { Character, ConfigService, DataService, Planet } from '../../core';

@Component({
  selector: 'ro-character-detail',
  templateUrl: './character-detail.component.html',
  styleUrls: ['./character-detail.component.scss']
})
export class CharacterDetailComponent implements OnInit {
  character: Character;
  homeWorld: Planet;
  planets: Observable<Planet[]>;
  ready = false;
  allegiances: Observable<string[]>;
  revealModel = false;

  private characters: Observable<Character[]>;

  constructor(
    public snackBar: MdSnackBar,
    private configService: ConfigService,
    private dataService: DataService,
    private actionsService: ActionsService,
    private store: Store<CharactersState>,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.ready = false;

    this.planets = this.store.select('planets');
    this.allegiances = this.store.select('allegiances');
    this.characters = this.store.select('characters');

    this.store.dispatch(this.actionsService.getPlanets());
    this.store.dispatch(this.actionsService.getAllegiances());
    this.store.dispatch(this.actionsService.getCharacters());

    this.route.params.map(params => parseInt(params['id'], 10))
      .subscribe(id => {
        this.characters.subscribe(
          characters => {
            const character = characters.find(c => c.id === +id);
            this.character = character;
          }
        );
      });

    Observable.combineLatest(this.planets, this.allegiances)
      .subscribe((summaries) => {
        this.syncHomeWorld(summaries[0]);
        this.ready = true;
        this.snackBar.open('Getting Planets and Allegiances succeeded', 'HTTP', this.configService.snackConfig);
      },
      () => this.snackBar.open('Getting Planets and Allegiances failed', 'ERROR', this.configService.snackConfig),
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
