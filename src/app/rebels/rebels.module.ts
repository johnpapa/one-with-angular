import { NgModule } from '@angular/core';
import { Framing } from '@framing/ng-core';

import { ItemFramer } from 'framing/item/item.framer';
import { RebelsController } from './rebels.controller';
import { RebelsViewModule } from './view/rebels-view.module';
import { ItemFormComponent } from './view/item-form/item-form.component';

@NgModule(Framing((framing) => framing
  .import(RebelsViewModule)
  .frame(new ItemFramer()
    .model({
      title: 'Rebels',
    })
    .view({
      itemFormComponent: ItemFormComponent,
    })
    .controller(RebelsController),
  ),
))
export class RebelsModule {}
