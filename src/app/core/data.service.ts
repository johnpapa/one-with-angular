import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
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

@Injectable()
export class DataService {
  private api: string;
  private characterCacher: Cacher<Character[]>;
  private allegianceCacher: Cacher<string[]>;
  private planetCacher: Cacher<Planet[]>;

  constructor(private http: Http, private configService: ConfigService) {
    this.api = this.configService.apiUrl;

    const characterSource = <Observable<Character[]>>this.http.get(`${this.api}people`)
      // .delay(this.configService.delay)
      .map((response: Response) => response.json().results)
      .map(characters => this.sortBy(characters, 'name'));

    const allegianceSource = <Observable<string[]>>this.http.get(`${this.api}allegiances`)
      // .delay(this.configService.delay)
      .map((response: Response) => response.json().results)
      .map(allegiances => this.sort(allegiances));

    const planetSource = <Observable<Planet[]>>this.http.get(`${this.api}planets`)
      // .delay(this.configService.delay)
      .map((response: Response) => response.json().results)
      .map(planets => this.sortBy(planets, 'name'));

    this.characterCacher = new Cacher<Character[]>(characterSource);
    this.allegianceCacher = new Cacher<string[]>(allegianceSource);
    this.planetCacher = new Cacher<Planet[]>(planetSource);
  }

  getCharacters(force = false) {
    return this.characterCacher.get(force)
      .filter(cr => !cr.fetching)
      .map(cr => cr.data);
  }

  getCharacterById(id: number) {
    return this.getCharacters()
      .map(characters => characters.find(c => c.id === id));
  }

  getAllegiances(force = false) {
    return this.allegianceCacher.get(force)
      .filter(cr => !cr.fetching)
      .map(cr => cr.data);
  }

  getPlanets(force = false) {
    return this.planetCacher.get(force)
      .filter(cr => !cr.fetching)
      .map(cr => cr.data);
  }

  getPlanetById(id: number) {
    return this.getPlanets()
      .map(planets => planets.find(c => c.id === id));
  }

  getPlanetSummary() {
    return Observable.combineLatest(
      this.getCharacters(),
      this.getPlanets(),
      this.projectCharactersOverPlanets
    )
      .map(summary => summary.filter((item) => item.value > 1 && item.name !== 'unknown'));
  }

  getAllegianceSummary() {
    return Observable.combineLatest(
      this.getCharacters(),
      this.getAllegiances(),
      this.projectCharactersOverAllegiances
    )
      .map(summary => summary.filter((item) => item.value > 0));
  }

  private projectCharactersOverAllegiances(characters, allegiances) {
    return allegiances.map(allegiance => (
      new SummaryData(
        allegiance, characters.reduce((acc, character) => acc += character.allegiance === allegiance ? 1 : 0, 0)
      )
    ));
  }

  private projectCharactersOverPlanets(characters, planets) {
    return planets.map(planet => (
      new SummaryData(
        planet.name,
        characters.reduce((acc, character) => acc += character.homeWorldId === planet.id ? 1 : 0, 0)
      )
    ));
  }

  private sortBy(data: any[], property: string) {
    return data.sort((a: any, b: any) => {
      if (a[property] < b[property]) { return -1; }
      if (a[property] > b[property]) { return 1; }
      return 0;
    });
  }

  private sort(data: any[]) {
    return data.sort((a: any, b: any) => {
      if (a < b) { return -1; }
      if (a > b) { return 1; }
      return 0;
    });
  }
}
