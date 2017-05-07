import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  MdCheckboxModule,
  MdInputModule,
  MdListModule,
} from '@angular/material';

import { PlanetsRoutingModule } from './planets-routing.module';
import { PlanetsComponent } from './planets/planets.component';
import { PlanetDetailComponent } from './planet-detail/planet-detail.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PlanetsRoutingModule,
    MdListModule,
    MdCheckboxModule,
    MdInputModule,
  ],
  declarations: [PlanetsComponent, PlanetDetailComponent]
})
export class PlanetsModule { }
