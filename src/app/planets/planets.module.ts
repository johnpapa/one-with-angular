import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';

import { PlanetsRoutingModule } from './planets-routing.module';
import { PlanetsComponent } from './planets.component';

@NgModule({
  imports: [
    CommonModule,
    PlanetsRoutingModule,
    MaterialModule
  ],
  declarations: [PlanetsComponent]
})
export class PlanetsModule { }
