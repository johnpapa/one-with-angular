import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { combineLatest } from 'rxjs/observable/combineLatest';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/reduce';

import { Character } from './character';
import { Planet } from './planet';
import { ConfigService } from './config.service';

@Injectable()
export class DataService {
  constructor(private http: Http, private configService: ConfigService) { }

  getCharacters() {
    return <Observable<Character[]>>this.http.get(`${this.configService.apiUrl}people`)
      .delay(this.configService.delay)
      .map((response: Response) => response.json().results)
      .map(characters => this.sortBy(characters, 'name'));
  }

  getPlanetSummary() {
    return combineLatest(this.getCharacters(), this.getPlanets(), this.scheduler)
      .map(summary => summary.filter((item) => item.value > 1 && item.name !== 'unknown'))
      .do(() => console.log('combined them'))
      .delay(500);
  }

  private scheduler(characters, planets) {
    return planets.map(planet => (
      {
        name: planet.name,
        value: characters.reduce((acc, character) => acc += character.homeWorldId === planet.id ? 1 : 0, 0)
      }
    ));
  }

  getPlanets() {
    return <Observable<Planet[]>>this.http.get(`${this.configService.apiUrl}planets`)
      .delay(this.configService.delay)
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
