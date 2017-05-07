import { Planet } from './planet';

export class Person {
  constructor(public id: number, public name: string, public homeWorldId: number, public homeWorld?: Planet) { }
}
