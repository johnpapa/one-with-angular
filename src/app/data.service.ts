import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/map';

import { Character } from './character';
import { Planet } from './planet';
import { ConfigService } from './config.service';

@Injectable()
export class DataService {
  constructor(private http: Http, private configService: ConfigService) { }

  getCharacters() {
    return <Observable<Character[]>>this.http.get(`${this.configService.apiUrl}people`)
      .map((response: Response) => response.json().results)
      .map(characters => this.sortBy(characters, 'name'));
  }

  // TODO: Tinkering
  // getCharacter(id: number) {
  //   const charactersObservable = <Observable<Character[]>>this.http.get(`${this.configService.apiUrl}people/${id}`)
  //     .map((response: Response) => response.json().results)
  //     .map(characters => this.sortBy(characters, 'name'));

  //   const planetsObservable = this.getPlanets();

  //   return Observable.forkJoin(charactersObservable, planetsObservable)
  //     .subscribe(results => {
  //       const character = results[0][0];
  //       const homeWorlds = results[1];
  //       const homeWorld = homeWorlds.find((hw => character.homeWorldId === hw.id));
  //       character.homeWorld = homeWorld; // this is this Character's homeWorld
  //     });
  // }

  getPlanets() {
    return <Observable<Planet[]>>this.http.get(`${this.configService.apiUrl}planets`)
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
