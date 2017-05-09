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
  MdSnackBarModule
} from '@angular/material';
import { BarChartModule, PieChartModule } from '@swimlane/ngx-charts';

const modules = [
  CommonModule,
  FormsModule,
  HttpModule,
  MdButtonModule,
  MdCheckboxModule,
  MdInputModule,
  MdListModule,
  MdProgressSpinnerModule,
  MdSelectModule,
  MdSnackBarModule,
  MdTabsModule,
  MdToolbarModule,
  BarChartModule,
  PieChartModule,
];

@NgModule({
  imports: [
    modules
  ],
  exports: [
    modules
  ],
  declarations: [],
})
export class SharedModule { }
