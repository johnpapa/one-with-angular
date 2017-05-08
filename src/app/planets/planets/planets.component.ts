import { Component, OnInit } from '@angular/core';
import { Planet } from '../../planet';
import { DataService } from '../../data.service';

@Component({
  selector: 'ro-planets',
  templateUrl: './planets.component.html',
  styleUrls: ['./planets.component.scss']
})
export class PlanetsComponent implements OnInit {
  title = 'Planets';
  planets: Planet[];
  selectedPlanet: Planet;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getPlanets()
      .subscribe(planets => this.planets = planets);
  }

  selectPlanet(planet: Planet) {
    this.selectedPlanet = planet;
  };
}
