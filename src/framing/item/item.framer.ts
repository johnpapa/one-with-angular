import { Type } from '@angular/core';
import { MaterialModule } from '@angular/material';
import { Framer, Framing, FramingNgModule } from '@framing/ng-core';

import { ItemController } from './item.controller';
import { ItemModel } from './item.model';
import { ItemView } from './item.view';

import { ItemViewModule } from './view/item-view.module';

import { ItemDetailComponent } from './view/item-detail/item-detail.component';
import { ItemsComponent } from './view/items/items.component';

export class ItemFramer extends Framer<ItemModel, ItemView> {

  public get framerName(): string { return 'Item'; }

  public get defaultModel(): ItemModel {
    return {
      revealModel: false,
    };
  }

  public get defaultView(): ItemView {
    return {
      itemDetailComponent: ItemDetailComponent,
      itemsComponent: ItemsComponent,
    };
  }

  public get defaultController(): Type<ItemController> {
    return ItemController;
  }

  public frame(framing: FramingNgModule): void {
    framing
      .import(ItemViewModule)
      .route()
      .component(this.theView.itemsComponent);
  }
}
