import { Component, OnChanges, Input } from '@angular/core';

import { Person } from '../person';
import { Planet } from '../planet';
import { DataService } from '../data.service';

@Component({
  selector: 'ro-people-detail',
  templateUrl: './people-detail.component.html',
  styleUrls: ['./people-detail.component.scss']
})
export class PeopleDetailComponent implements OnChanges {
  @Input() person: Person;
  homeWorld: Planet;
  planets: Planet[];
  revealModel = false;

  constructor(private dataService: DataService) { }

  ngOnChanges() {
    this.dataService.getPlanets()
      .subscribe(planets => {
        this.planets = planets;
        this.syncHomeWorld();
      });
  }

  syncHomeWorld() {
    if (this.person) {
      const homeWorld = this.planets.find((planet => {
        return this.person.homeWorldId === planet.id;
      }));
      // this.homeWorld = homeWorld;
      this.person.homeWorld = homeWorld;
    }
  }
}
