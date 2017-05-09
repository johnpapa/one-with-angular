import { Component, OnChanges, Input } from '@angular/core';

import { Character, DataService, Planet } from '../../core';

@Component({
  selector: 'ro-character-detail',
  templateUrl: './character-detail.component.html',
  styleUrls: ['./character-detail.component.scss']
})
export class CharacterDetailComponent implements OnChanges {
  @Input() character: Character;
  homeWorld: Planet;
  planets: Planet[];
  revealModel = false;

  constructor(private dataService: DataService) { }

  get icon() {
    return this.character ? `${this.character.allegiance}-icon` : '';
  }

  ngOnChanges() {
    this.dataService.getPlanets()
      .subscribe(planets => {
        this.planets = planets;
        this.syncHomeWorld();
      });
  }

  syncHomeWorld() {
    if (this.character) {
      const homeWorld = this.planets.find((planet => this.character.homeWorldId === planet.id));
      this.character.homeWorld = homeWorld;
    }
  }
}
