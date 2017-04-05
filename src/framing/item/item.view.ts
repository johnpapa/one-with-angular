import { Type } from '@angular/core';

export interface ItemView {
  itemDetailComponent?: Type<any>;

  itemsComponent?: Type<any>;

  itemFormComponent?: Type<any>;
}
