import { Component, OnInit, Input, SimpleChanges, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MdSnackBar } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/takeUntil';

import { Character, ConfigService, DataService, Planet } from '../../core';

@Component({
  selector: 'ro-character-detail',
  templateUrl: './character-detail.component.html',
  styleUrls: ['./character-detail.component.scss']
})
export class CharacterDetailComponent implements OnDestroy, OnInit {
  character: Character;
  homeWorld: Planet;
  planets: Planet[];
  ready = false;
  allegiances: string[];
  revealModel = false;

  private onDestroy = new Subject();

  constructor(
    private dataService: DataService,
    private snackBar: MdSnackBar,
    private configService: ConfigService,
    private route: ActivatedRoute,
  ) { }

  ngOnDestroy() {
    this.onDestroy.next();
  }

  ngOnInit() {
    this.route.params.map(params => parseInt(params['id'], 10))
      .switchMap(id => this.dataService.getCharacterById(id))
      .takeUntil(this.onDestroy)
      .subscribe(character => {
        this.character = character;
        this.getData();
      });
  }

  getData() {
    this.ready = false;
    Observable.combineLatest(this.dataService.getPlanets(), this.dataService.getAllegiances())
      .takeUntil(this.onDestroy)
      .subscribe(([planets, allegiance]) => {
          this.planets = planets;
          this.allegiances = allegiance;
          this.syncHomeWorld();
          this.ready = true;
        });
        // TODO: fix this () => this.snackBar.open('Getting Planets and Allegiances failed', 'ERROR', this.configService.snackConfig),
        // TODO: fix this () => this.snackBar.open('Getting Planets and Allegiances succeeded', 'SUCCESS', this.configService.snackConfig)
  }

  get icon() {
    let iconName = '';
    if (this.character && this.character.allegiance) {
      iconName = `${this.character.allegiance.replace(' ', '-')}-icon`;
    }
    return iconName;
  }

  syncHomeWorld() {
    if (this.character && this.planets) {
      const homeWorld = this.planets.find((planet => this.character.homeWorldId === planet.id));
      this.character.homeWorld = homeWorld;
    }
  }
}
