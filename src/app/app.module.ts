import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpModule, RequestOptions } from '@angular/http';
// import { FormsModule } from '@angular/forms';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import {
//   MdButtonModule,
//   MdCheckboxModule,
//   MdInputModule,
//   MdListModule,
//   MdProgressSpinnerModule,
//   MdSelectModule,
//   MdTabsModule,
//   MdToolbarModule,
// } from '@angular/material';
// import { NgxChartsModule } from '@swimlane/ngx-charts';

import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    // My Code
    AppRoutingModule,
    CoreModule,
    SharedModule,
  ],
  declarations: [
    AppComponent,
    DashboardComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(requestOptions: RequestOptions) {
    requestOptions.headers.set('Content-Type', 'application/json');
  }
}
