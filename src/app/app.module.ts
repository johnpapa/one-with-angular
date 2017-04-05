import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MdButtonModule,
  MdCheckboxModule,
  MdInputModule,
  MdListModule,
  MdSelectModule,
  MdToolbarModule,
} from '@angular/material';
import { Framing } from '@framing/ng-core';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { DataService } from './data.service';
import { RebelsModule } from './rebels/rebels.module';

@NgModule(Framing((framing) => framing
  .root()
  .children([
    { path: '', pathMatch: 'full', redirectTo: 'rebels', },
    { path: 'rebels', loadChildren: () => RebelsModule },
    { path: 'planets', loadChildren: 'app/planets/planets.module#PlanetsModule' },
    { path: '**', pathMatch: 'full', redirectTo: 'rebels' },
  ])
  .declarations([
    NavComponent,
  ])
  .imports([
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    MdButtonModule,
    MdCheckboxModule,
    MdInputModule,
    MdListModule,
    MdSelectModule,
    MdToolbarModule,
  ])
  .provider(DataService)
  .componentAndDeclare(AppComponent),
))
export class AppModule { }
