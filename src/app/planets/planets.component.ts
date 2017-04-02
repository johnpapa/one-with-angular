import { Component, OnInit } from '@angular/core';
import { Planet } from '../planet';
import { DataService } from '../data.service';

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
    this.planets = this.dataService.getPlanets();
  }

  selectPlanet(planet: Planet) {
    this.selectedPlanet = planet;
  };
}
