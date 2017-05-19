import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MdSnackBar } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';

import { ConfigService, DataService, Planet } from '../../core';

@Component({
  selector: 'ro-planet-detail',
  templateUrl: './planet-detail.component.html',
  styleUrls: ['./planet-detail.component.scss']
})
export class PlanetDetailComponent implements OnInit {
  @Input() planet: Planet;
  revealModel = false;

  constructor(
    private dataService: DataService,
    private snackBar: MdSnackBar,
    private configService: ConfigService,
    private route: ActivatedRoute) { }

  ngOnInit() {
  this.route.params.map(params => parseInt(params['id'], 10))
    .switchMap(id => this.dataService.getPlanetById(id))
    .subscribe(planet => this.planet = planet);
  }
}
