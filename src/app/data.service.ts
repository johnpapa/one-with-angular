import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

import { Rebel } from './rebel';
import { Planet } from './planet';
import { ConfigService } from './config.service';

@Injectable()
export class DataService {
  constructor(private http: Http, private configService: ConfigService) { }

  getRebels() {
    return this.http.get(`${this.configService.apiUrl}people`)
      .map((response: Response) => response.json().results)
      .map(rebels => this.sortBy(rebels, 'name'));
  }

  getPlanets() {
    return this.http.get(`${this.configService.apiUrl}planets`)
      .map((response: Response) => response.json().results)
      .map(planets => this.sortBy(planets, 'name'));
  }

  private sortBy(data: any[], property: string) {
    return data.sort((a: any, b: any) => {
      if (a[property] < b[property]) { return -1; }
      if (a[property] > b[property]) { return 1; }
      return 0;
    });
  }
}
