import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { combineLatest } from 'rxjs/observable/combineLatest';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/groupBy';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
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

  getPlanetSummary2() {
    const charactersObservable = this.getCharacters();
    let grouped;

    // Yields an array of arrays, grouped by homeworld
    // e.g. [ [c1, c2, c3], [c4, c5], [c6, c7, c8, c9], [c10] ]
    grouped = charactersObservable
      .mergeMap(obs => <Character[]>obs)
      .groupBy(character => character.homeWorldId)
      .mergeMap(group => group.reduce((acc, curr) => [...acc, curr], []))

    return grouped;
  }

  getPlanetSummary() {
    const charactersObservable = this.getCharacters();
    const planetsObservable = this.getPlanets();

    return combineLatest(
      charactersObservable,
      planetsObservable,
      (characters, planets) => planets.map(p =>
        ({
          name: p.name,
          value: characters.reduce((acc, c) => acc += c.homeWorldId === p.id ? 1 : 0, 0)
        })
      )
    )
    .map(summary => summary.filter((item) => item.value > 1 && item.name !== 'unknown'))
    .do(() => console.log('combined them'))
    .delay(500);

    // return planetsObservable
    //   .mergeMap(charactersObservable => c )
    //   ,
    //   function () { return Observable.timer(0); },
    //   function () { return Observable.timer(0); },
    //   function (x, y) { return x + y; }
    //   )
    //
    // return Observable.forkJoin(charactersObservable, planetsObservable)
    //   .subscribe(results => {
    //     const characters = results[0];
    //     const homeWorlds = results[1];
    //     homeWorlds.map(p => {
    //       return { planet: p.name, count: characters.filter(c => c.homeWorldId === p.id) };
    //     });
    //   });
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
