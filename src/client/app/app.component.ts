import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { DataService } from './core';

@Component({
  selector: 'ro-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isFetching: Observable<boolean>;

  constructor(dataService: DataService) {
    this.isFetching = dataService.isFetching;
  }
}
