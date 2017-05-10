import { Component, OnChanges, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MdSnackBar } from '@angular/material';
import { Observable } from 'rxjs/Observable';

import { Character, ConfigService, DataService, Planet } from '../../core';

@Component({
  selector: 'ro-character-detail',
  templateUrl: './character-detail.component.html',
  styleUrls: ['./character-detail.component.scss']
})
export class CharacterDetailComponent implements OnChanges {
  @Input() character: Character;
  homeWorld: Planet;
  planets: Planet[];
  ready = false;
  allegiances: string[];
  revealModel = false;

  constructor(
    private dataService: DataService,
    public snackBar: MdSnackBar,
    private configService: ConfigService
  ) {
  }

  get icon() {
    let iconName = '';
    if (this.character && this.character.allegiance) {
      iconName = `${this.character.allegiance.replace(' ', '-')}-icon`;
    }
    return iconName;
  }

  ngOnChanges() {
    this.ready = false;
    Observable.forkJoin(this.dataService.getPlanets(), this.dataService.getAllegiances())
      .subscribe(
      (summaries) => {
        this.planets = summaries[0];
        this.allegiances = summaries[1];
        this.syncHomeWorld();
        this.ready = true;
      },
      () => this.snackBar.open('Getting Planets and Allegiances failed', 'ERROR', this.configService.snackConfig),
      () => this.snackBar.open('Getting Planets and Allegiances succeeded', 'HTTP', this.configService.snackConfig)
      );
  }

  syncHomeWorld() {
    if (this.character) {
      const homeWorld = this.planets.find((planet => this.character.homeWorldId === planet.id));
      this.character.homeWorld = homeWorld;
    }
  }
}
