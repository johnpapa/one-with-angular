import { NgModule } from '@angular/core';
import { Framing } from '@framing/ng-core';

import { ItemsComponent } from './items/items.component';
import { ItemDetailComponent } from './item-detail/item-detail.component';

@NgModule(Framing((framing) => framing
  .declarationsAndEntryComponents([
    ItemsComponent,
    ItemDetailComponent,
  ]),
))
export class ItemViewModule {}
