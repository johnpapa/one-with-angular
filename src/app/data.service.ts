import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/map';

import { Person } from './person';
import { Planet } from './planet';
import { ConfigService } from './config.service';

@Injectable()
export class DataService {
  constructor(private http: Http, private configService: ConfigService) { }

  getPeople() {
    return <Observable<Person[]>>this.http.get(`${this.configService.apiUrl}people`)
      .map((response: Response) => response.json().results)
      .map(people => this.sortBy(people, 'name'));
  }

  // TODO: Tinkering
  // getPerson(id: number) {
  //   const peopleObservable = <Observable<Person[]>>this.http.get(`${this.configService.apiUrl}people/${id}`)
  //     .map((response: Response) => response.json().results)
  //     .map(people => this.sortBy(people, 'name'));

  //   const planetsObservable = this.getPlanets();

  //   return Observable.forkJoin(peopleObservable, planetsObservable)
  //     .subscribe(results => {
  //       const person = results[0][0];
  //       const homeWorlds = results[1];
  //       const homeWorld = homeWorlds.find((hw => person.homeWorldId === hw.id));
  //       person.homeWorld = homeWorld; // this is this Person's homeWorld
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
