import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import {
//   MdCheckboxModule,
//   MdInputModule,
//   MdListModule,
//   MdProgressSpinnerModule,
// } from '@angular/material';

import { SharedModule } from '../shared/shared.module';
import { PlanetsRoutingModule } from './planets-routing.module';
import { PlanetsComponent } from './planets/planets.component';
import { PlanetDetailComponent } from './planet-detail/planet-detail.component';

@NgModule({
  imports: [
    // CommonModule,
    // FormsModule,
    SharedModule,
    // MdListModule,
    // MdCheckboxModule,
    // MdInputModule,
    // MdProgressSpinnerModule,
    PlanetsRoutingModule,
  ],
  declarations: [
    PlanetsComponent,
    PlanetDetailComponent
  ]
})
export class PlanetsModule { }
