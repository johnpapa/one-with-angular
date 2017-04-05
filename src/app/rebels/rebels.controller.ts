import { Injectable } from '@angular/core';

import { ItemController } from 'framing/item/item.controller';

import { DataService } from '../data.service';
import { Planet } from '../planet';

@Injectable()
export class RebelsController extends ItemController {
  planets: Planet[];

  constructor(
    dataService: DataService,
  ) { super(dataService); }

  onControllerInit() {
    super.onControllerInit();

    this.dataService.getPlanets()
      .subscribe(planets => this.planets = planets);
  }
}
