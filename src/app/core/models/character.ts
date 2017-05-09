import { Planet } from './planet';

export class Character {
  constructor(public id: number, public name: string, public homeWorldId: number, public allegiance?: string, public homeWorld?: Planet) { }
}
