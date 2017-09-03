import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { SharedModule } from '../shared/shared.module';
import { NavComponent } from './nav/nav.component';
import { AuthService } from './auth.service';
import { ConfigService } from './config.service';
import { DataService } from './data.service';
import { throwIfAlreadyLoaded } from './module-import-guard';
import { HeaderInterceptor } from './header.interceptor';
import { LogInterceptor } from './log.interceptor';

@NgModule({
  imports: [
    CommonModule, // we use *ngFor
    RouterModule, // we use router-outlet and routerLink
    SharedModule  // we use angular material
  ],
  exports: [NavComponent],
  declarations: [NavComponent],
  providers: [
    AuthService,
    ConfigService,
    DataService,
    { provide: HTTP_INTERCEPTORS, useClass: HeaderInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LogInterceptor, multi: true },
  ]
})
export class CoreModule {
  constructor(
    @Optional()
    @SkipSelf()
    parentModule: CoreModule
  ) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
