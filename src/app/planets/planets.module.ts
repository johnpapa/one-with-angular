import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdListModule } from '@angular/material';

import { PlanetsRoutingModule } from './planets-routing.module';
import { PlanetsComponent } from './planets.component';

@NgModule({
  imports: [
    CommonModule,
    PlanetsRoutingModule,
    MdListModule
  ],
  declarations: [PlanetsComponent]
})
export class PlanetsModule { }
