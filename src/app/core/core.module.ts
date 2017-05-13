import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { NavComponent } from './nav/nav.component';
import { ConfigService } from './config.service';
import { DataService } from './data.service';
import { throwIfAlreadyLoaded } from './module-import-guard';
import { ActionsService } from './actions.service';
import { EffectsService } from './effects.service';
import { StoreModule } from "@ngrx/store";
// import { ReducersService } from './reducers.service';
import reducer from './reducers.service';
import { EffectsModule } from "@ngrx/effects";

@NgModule({
  imports: [
    CommonModule, // we use *ngFor
    RouterModule, // we use router-outlet and routerLink
    SharedModule, // we use angular material
    StoreModule.provideStore(reducer),
    EffectsModule.run(EffectsService)
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
    ActionsService,
    EffectsService,
  ],
})
export class CoreModule {
  constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
