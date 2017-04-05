import { Component } from '@angular/core';

import { ItemController } from '../../item.controller';

@Component({
  selector: 'ro-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent {
  constructor(
    public itemController: ItemController,
  ) { }
}
