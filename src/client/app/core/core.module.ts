import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { NavComponent } from './nav/nav.component';
import { ConfigService } from './config.service';
import { DataService } from './data.service';
import { throwIfAlreadyLoaded } from './module-import-guard';

@NgModule({
  imports: [
    CommonModule, // we use *ngFor
    RouterModule, // we use router-outlet and routerLink
    SharedModule, // we use angular material
  ],
  exports: [
    NavComponent,
  ],
  declarations: [
    NavComponent,
  ],
  providers: [
    ConfigService,
    DataService,
  ],
})
export class CoreModule {
  constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
