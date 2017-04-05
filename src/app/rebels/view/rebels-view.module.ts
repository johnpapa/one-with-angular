import { NgModule } from '@angular/core';
import { Framing } from '@framing/ng-core';

import { ItemFormComponent } from './item-form/item-form.component';

@NgModule(Framing((framing) => framing
  .declarationsAndEntryComponents([
    ItemFormComponent,
  ]),
))
export class RebelsViewModule {}
