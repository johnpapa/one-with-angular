import { Component, OnInit, Input } from '@angular/core';

import { ItemController } from '../../item.controller';

@Component({
  selector: 'ro-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.scss']
})
export class ItemDetailComponent implements OnInit {
  constructor(
    public itemController: ItemController,
  ) { }

  ngOnInit() {

  }
}
