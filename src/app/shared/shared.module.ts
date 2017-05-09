import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
import { NgxChartsModule } from '@swimlane/ngx-charts';

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
    NgxChartsModule,
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
    NgxChartsModule,
  ],
  declarations: []
})
export class SharedModule { }
