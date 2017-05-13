import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/publishReplay';
import 'rxjs/add/operator/reduce';

import { Character } from '../core/models/character';
import { Planet } from './models/planet';
import { ConfigService } from './config.service';
import { SummaryData } from './models/summary-data';

@Injectable()
export class DataService {
  private planets: Observable<Planet[]> = null;
  private allegiances: Observable<string[]> = null;

  constructor(private http: Http, private configService: ConfigService) { }

  getCharacters() {
    return <Observable<Character[]>>this.http.get(`${this.configService.apiUrl}people`)
      .delay(this.configService.delay)
      .map((response: Response) => response.json().results)
      .map(characters => this.sortBy(characters, 'name'));
  }

  getAllegiances() {
    if (!this.allegiances) {
      this.allegiances = <Observable<string[]>>this.http.get(`${this.configService.apiUrl}allegiances`)
        .delay(this.configService.delay)
        .map((response: Response) => response.json().results)
        .map(allegiances => this.sort(allegiances));
        // .publishReplay(1)
        // .refCount();
    }
    return this.allegiances;
  }

  getPlanets() {
    if (!this.planets) {
      this.planets = <Observable<Planet[]>>this.http.get(`${this.configService.apiUrl}planets`)
        .delay(this.configService.delay)
        .map((response: Response) => response.json().results)
        .map(planets => this.sortBy(planets, 'name'));
        // .publishReplay(1)
        // .refCount();
    }
    return this.planets;
  }

  getPlanetSummary() {
    return Observable.forkJoin(this.getCharacters(), this.getPlanets(), this.projectCharactersOverPlanets)
      .map(summary => summary.filter((item) => item.value > 1 && item.name !== 'unknown'));
  }

  getAllegianceSummary() {
    return Observable.forkJoin(this.getCharacters(), this.getAllegiances(), this.projectCharactersOverAllegiances)
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
