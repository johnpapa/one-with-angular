import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { PlanetsRoutingModule } from './planets-routing.module';
import { PlanetsComponent } from './planets/planets.component';
import { PlanetDetailComponent } from './planet-detail/planet-detail.component';

@NgModule({
  imports: [
    SharedModule,
    PlanetsRoutingModule,
  ],
  declarations: [
    PlanetsComponent,
    PlanetDetailComponent
  ]
})
export class PlanetsModule { }
