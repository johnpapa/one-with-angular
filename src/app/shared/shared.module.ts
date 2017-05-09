import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {
  MdButtonModule,
  MdCheckboxModule,
  MdInputModule,
  MdListModule,
  MdProgressSpinnerModule,
  MdSelectModule,
  MdTabsModule,
  MdToolbarModule,
} from '@angular/material';
import { BarChartModule, PieChartModule} from '@swimlane/ngx-charts';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    MdButtonModule,
    MdCheckboxModule,
    MdInputModule,
    MdListModule,
    MdProgressSpinnerModule,
    MdSelectModule,
    MdTabsModule,
    MdToolbarModule,
    BarChartModule,
    PieChartModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    HttpModule,
    MdButtonModule,
    MdCheckboxModule,
    MdInputModule,
    MdListModule,
    MdProgressSpinnerModule,
    MdSelectModule,
    MdTabsModule,
    MdToolbarModule,
    BarChartModule,
    PieChartModule,
  ],
  declarations: []
})
export class SharedModule { }
