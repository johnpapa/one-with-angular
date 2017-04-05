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

  public selectItem(item: any) {
    this.model.selectedItem = item;
  };

  public onControllerInit(): void {
    this.dataService[this.model.apiMethod]()
      .subscribe(items => this.model.items = items);
  }
}
