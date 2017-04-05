import { Injectable } from '@angular/core';
import { Controller } from '@framing/ng-core';

import { ItemModel } from './item.model';
import { ItemView } from './item.view';

import { DataService } from '../../app/data.service';

@Injectable()
export class ItemController extends Controller<ItemModel, ItemView> {

  constructor(
    public dataService: DataService,
  ) { super(); }

  selectItem(item: any) {
    this.model.selectedItem = item;
  };

  onControllerInit(): void {
    this.dataService.getRebels()
      .subscribe(items => this.model.items = items);
  }
}
