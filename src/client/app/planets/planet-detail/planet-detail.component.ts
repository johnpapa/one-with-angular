import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MdSnackBar } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/takeUntil';

import { ConfigService, DataService, Planet } from '../../core';

@Component({
  selector: 'ro-planet-detail',
  templateUrl: './planet-detail.component.html',
  styleUrls: ['./planet-detail.component.scss']
})
export class PlanetDetailComponent implements OnDestroy, OnInit {
  @Input() planet: Planet;
  revealModel = false;

  private onDestroy = new Subject();

  constructor(
    private dataService: DataService,
    private snackBar: MdSnackBar,
    private configService: ConfigService,
    private route: ActivatedRoute) { }

  ngOnDestroy() {
    this.onDestroy.next();
  }

  ngOnInit() {
    this.route.params.map(params => parseInt(params['id'], 10))
      .takeUntil(this.onDestroy)
      .switchMap(id => this.dataService.getPlanetById(id))
      .subscribe(planet => this.planet = planet);
  }
}
