import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MdSnackBar } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';

import { Character, ConfigService, DataService, Planet } from '../../core';

@Component({
  selector: 'ro-character-detail',
  templateUrl: './character-detail.component.html',
  styleUrls: ['./character-detail.component.scss']
})
export class CharacterDetailComponent implements OnInit {
  character: Character;
  homeWorld: Planet;
  planets: Planet[];
  ready = false;
  allegiances: string[];
  revealModel = false;

  constructor(
    private dataService: DataService,
    private snackBar: MdSnackBar,
    private configService: ConfigService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.route.params.map(params => parseInt(params['id'], 10))
      .switchMap(id => this.dataService.getCharacterById(id))
      .subscribe(character => {
        this.character = character;
        this.getData();
      });
  }

  getData() {
    this.ready = false;
    Observable.combineLatest(this.dataService.getPlanets(), this.dataService.getAllegiances())
      .subscribe(([planetsPkg, allegiancePkg]) => {
        this.planets = planetsPkg.data;
        this.allegiances = allegiancePkg.data;
        this.syncHomeWorld();
        this.ready = true;
      },
      () => this.snackBar.open('Getting Planets and Allegiances failed', 'ERROR', this.configService.snackConfig),
      () => this.snackBar.open('Getting Planets and Allegiances succeeded', 'HTTP', this.configService.snackConfig)
      );
  }

  get icon() {
    let iconName = '';
    if (this.character && this.character.allegiance) {
      iconName = `${this.character.allegiance.replace(' ', '-')}-icon`;
    }
    return iconName;
  }

  syncHomeWorld() {
    if (this.character) {
      const homeWorld = this.planets.find((planet => this.character.homeWorldId === planet.id));
      this.character.homeWorld = homeWorld;
    }
  }
}
