import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/publishReplay';
import 'rxjs/add/operator/reduce';

import { Character } from '../core/models/character';
import { Planet } from './models/planet';
import { ConfigService } from './config.service';
import { SummaryData } from './models/summary-data';
import { Cacher } from './cacher';
import { createOnDemandCache } from './caching-fns';

interface DataResponse<T> {
  count: number;
  results: T[];
}

@Injectable()
export class DataService {
  private api: string;
  private characterCacher: Cacher<Character[]>;
  private allegianceCacher: Cacher<string[]>;
  private planetCacher: Cacher<Planet[]>;

  /** Observable is true if any of the cached sources is fetching */
  isFetching: Observable<boolean>;

  constructor(private http: HttpClient, private configService: ConfigService) {
    this.api = this.configService.apiUrl;
    Cacher.verbose = true; // So we can see console logs

    const characterSource: Observable<Character[]> = this.http
      .get<DataResponse<Character[]>>(`${this.api}people`)
      .delay(this.configService.httpDelay)
      .map(data => data.results)
      .map(characters => this.sortBy(characters, 'name'));

    const allegianceSource: Observable<string[]> = this.http
      .get<DataResponse<string[]>>(`${this.api}allegiances`)
      .delay(this.configService.httpDelay)
      .map(data => data.results)
      .map(allegiances => this.sort(allegiances));

    const planetSource: Observable<Planet[]> = this.http
      .get<DataResponse<Planet[]>>(`${this.api}planets`)
      .delay(this.configService.httpDelay)
      .map(data => data.results)
      .map(planets => this.sortBy(planets, 'name'));

    const duration = this.configService.httpCacheDuration;
    this.characterCacher = new Cacher(characterSource, duration);
    this.allegianceCacher = new Cacher(allegianceSource, duration);
    this.planetCacher = new Cacher(planetSource, duration);

    this.isFetching = combineLatest(
      this.characterCacher.notifications,
      this.allegianceCacher.notifications,
      this.planetCacher.notifications,
      (h, v) => h.type === 'fetching' || v.type === 'fetching'
    );
  }

  getCharacters(force = false) {
    this.characterCacher.update(force);
    return this.characterCacher.cache;
  }

  getCharacterById(id: number) {
    return this.getCharacters().map(characters => {
      return characters && characters.find ? characters.find(c => c.id === id) : undefined;
    });
  }

  getAllegiances(force = false) {
    this.allegianceCacher.update(force);
    return this.allegianceCacher.cache;
  }

  getPlanets(force = false) {
    this.planetCacher.update(force);
    return this.planetCacher.cache;
  }

  getPlanetById(id: number) {
    return this.getPlanets().map(planets => {
      return planets && planets.find ? planets.find(c => c.id === id) : undefined;
    });
  }

  getPlanetSummary() {
    return Observable.combineLatest(
      this.getCharacters(),
      this.getPlanets(),
      this.projectCharactersOverPlanets
    ).map(summary => summary.filter(item => item.value > 1 && item.name !== 'unknown'));
  }

  getAllegianceSummary() {
    return Observable.combineLatest(
      this.getCharacters(),
      this.getAllegiances(),
      this.projectCharactersOverAllegiances
    ).map(summary => summary.filter(item => item.value > 0));
  }

  private projectCharactersOverAllegiances(characters, allegiances) {
    if (!characters || !allegiances) {
      return of([]);
    }

    return allegiances.map(
      allegiance =>
        new SummaryData(
          allegiance,
          characters.reduce((acc, character) => (acc += character.allegiance === allegiance ? 1 : 0), 0)
        )
    );
  }

  private projectCharactersOverPlanets(characters, planets) {
    if (!characters || !planets) {
      return of([]);
    }

    return planets.map(
      planet =>
        new SummaryData(
          planet.name,
          characters.reduce((acc, character) => (acc += character.homeWorldId === planet.id ? 1 : 0), 0)
        )
    );
  }

  private sortBy(data: any[], property: string) {
    return data.sort((a: any, b: any) => {
      if (a[property] < b[property]) {
        return -1;
      }
      if (a[property] > b[property]) {
        return 1;
      }
      return 0;
    });
  }

  private sort(data: any[]) {
    return data.sort((a: any, b: any) => {
      if (a < b) {
        return -1;
      }
      if (a > b) {
        return 1;
      }
      return 0;
    });
  }
}
