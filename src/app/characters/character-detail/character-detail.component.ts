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

  getPlanets() {
    this.dataService.getPlanets()
      .subscribe(planets => {
        this.planets = planets;
        this.syncHomeWorld();
      });
  }

  get icon() {
    let iconName = '';
    if (this.character && this.character.allegiance) {
      iconName = `${this.character.allegiance.replace(' ', '-')}-icon`;
    }
    return iconName;
  }

  ngOnChanges() {
    this.getPlanets();
  }

  syncHomeWorld() {
    if (this.character) {
      const homeWorld = this.planets.find((planet => this.character.homeWorldId === planet.id));
      this.character.homeWorld = homeWorld;
    }
  }
}
