import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { Framing } from '@framing/ng-core';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { DataService } from './data.service';
import { RebelsModule } from './rebels/rebels.module';

export function config(framing) {
  return framing
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
      BrowserAnimationsModule,
      FormsModule,
      HttpModule,
      MaterialModule,
    ])
    .provider(DataService)
    .componentAndDeclare(AppComponent);
}

export const ngModuleConfig = Framing(config);

@NgModule(ngModuleConfig)
export class AppModule { }
