import { Injectable } from '@angular/core';

import { Rebel } from './rebel';
import { Planet } from './planet';

const rebels: Rebel[] = [
  new Rebel(10, 'Jyn Erso', 1),
  new Rebel(11, 'Cassian Andor', 2),
  new Rebel(12, 'K-2SO', 3),
  new Rebel(13, 'Saw Gererra', 4),
  new Rebel(14, 'Chirrut Îmwe', 5),
  new Rebel(15, 'Baze Malbus', 5),
  new Rebel(16, 'Bodhi Rook', 5),
  new Rebel(17, 'Mon Mothma', 6),
  new Rebel(18, 'Galen Erso', 7),
  new Rebel(19, 'Bail Organa', 8),
  new Rebel(20, 'Leia Organa', 8),
  new Rebel(21, 'Lyra Erso', 9)
];

const planets: Planet[] = [
  new Planet(1, 'Vallt'),
  new Planet(2, 'Fest'),
  new Planet(3, 'Vulpter'),
  new Planet(4, 'Onderon'),
  new Planet(5, 'Jedha'),
  new Planet(6, 'Chandrila'),
  new Planet(7, 'Grange'),
  new Planet(8, 'Alderaan'),
  new Planet(9, 'Aria Prime')
];

@Injectable()
export class DataService {
  constructor() { }

  async getRebels() {
    return this.sortBy(rebels, 'name');
  }

  async getPlanets() {
    return this.sortBy(planets, 'name');
  }

  private sortBy(data: any[], property: string) {
    return data.sort((a: any, b: any) => {
      if (a[property] < b[property]) { return -1; }
      if (a[property] > b[property]) { return 1; }
      return 0;
    });
  }
}
