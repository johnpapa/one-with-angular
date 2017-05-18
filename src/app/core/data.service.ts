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

    this.characterCacher = Cacher.create<Character[]>(characterSource);
    this.allegianceCacher = Cacher.create<string[]>(allegianceSource);
    this.planetCacher = Cacher.create<Planet[]>(planetSource);
  }

  getCharacters() {
    this.characterCacher.refresh();
    return this.characterCacher.observable.filter(p => !p.fetching);
  }

  getCharacterById(id: number) {
    return this.getCharacters().filter(p => !p.fetching)
      .map(pkg => pkg.data)
      .map(characters => characters.find(c => c.id === id));
  }

  getAllegiances() {
    this.allegianceCacher.refresh();
    return this.allegianceCacher.observable.filter(p => !p.fetching);
  }

  getPlanets() {
    this.planetCacher.refresh();
    return this.planetCacher.observable.filter(p => !p.fetching);
  }

  getPlanetById(id: number) {
    return this.getPlanets().filter(p => !p.fetching)
      .map(pkg => pkg.data)
      .map(planets => planets.find(c => c.id === id));
  }

  getPlanetSummary() {
    return Observable.combineLatest(
      this.getCharacters().filter(p => !p.fetching),
      this.getPlanets().filter(p => !p.fetching),
      this.projectCharactersOverPlanets
    )
      .map(summary => summary.filter((item) => item.value > 1 && item.name !== 'unknown'));
  }

  getAllegianceSummary() {
    return Observable.combineLatest(
      this.getCharacters().filter(p => !p.fetching),
      this.getAllegiances().filter(p => !p.fetching),
      this.projectCharactersOverAllegiances
    )
      .map(summary => summary.filter((item) => item.value > 0));
  }

  private projectCharactersOverAllegiances(charactersPkg, allegiancesPkg) {
    const characters = charactersPkg.data;
    const allegiances = allegiancesPkg.data;
    return allegiances.map(allegiance => (
      new SummaryData(
        allegiance, characters.reduce((acc, character) => acc += character.allegiance === allegiance ? 1 : 0, 0)
      )
    ));
  }

  private projectCharactersOverPlanets(charactersPkg, planetsPkg) {
    const characters = charactersPkg.data;
    const planets = planetsPkg.data;
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
