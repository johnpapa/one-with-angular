import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { PlanetsRoutingModule } from './planets-routing.module';
import { PlanetsComponent } from './planets.component';
import { PlanetDetailComponent } from './planet-detail/planet-detail.component';
import { PlanetListComponent } from './planet-list/planet-list.component';

@NgModule({
  imports: [
    SharedModule,
    PlanetsRoutingModule,
  ],
  declarations: [
    PlanetsComponent,
    PlanetListComponent,
    PlanetDetailComponent,
  ]
})
export class PlanetsModule { }
