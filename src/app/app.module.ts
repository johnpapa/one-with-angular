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

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { NavComponent } from './nav/nav.component';
import { PeopleComponent } from './people/people.component';
import { DataService } from './data.service';
import { PeopleDetailComponent } from './people-detail/people-detail.component';
import { ConfigService } from './config.service';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    PeopleComponent,
    PeopleDetailComponent
  ],
  imports: [
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
    // My Code
    AppRoutingModule
  ],
  providers: [DataService, ConfigService],
  bootstrap: [AppComponent]
})
export class AppModule { }
