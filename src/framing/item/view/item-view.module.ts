import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';
import { Framing } from '@framing/ng-core';

import { ItemsComponent } from './items/items.component';
import { ItemDetailComponent } from './item-detail/item-detail.component';

export const ngModuleConfig = Framing((framing) => framing
  .imports([
    FormsModule,
    MaterialModule,
  ])
  .declarationsAndEntryComponents([
    ItemsComponent,
    ItemDetailComponent,
  ]),
);

@NgModule(ngModuleConfig)
export class ItemViewModule {}
