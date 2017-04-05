import { Component } from '@angular/core';

import { ItemController } from 'framing/item/item.controller';

@Component({
  selector: 'ro-item-form',
  templateUrl: './item-form.component.html',
  styleUrls: ['./item-form.component.scss']
})
export class ItemFormComponent {
  constructor(
    public itemController: ItemController,
  ) { }
}
