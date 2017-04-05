import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';
import { Framing } from '@framing/ng-core';

import { ItemFormComponent } from './item-form/item-form.component';

export const ngModuleConfig = Framing((framing) => framing
  .imports([
    FormsModule,
    MaterialModule,
  ])
  .declarationsAndEntryComponents([
    ItemFormComponent,
  ]),
);

@NgModule(ngModuleConfig)
export class RebelsViewModule {}
