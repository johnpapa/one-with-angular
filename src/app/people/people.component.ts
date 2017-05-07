import { Component, OnInit } from '@angular/core';

import { Person } from '../person';
import { DataService } from '../data.service';

@Component({
  selector: 'ro-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss']
})
export class PeopleComponent implements OnInit {
  title = 'People';
  people: Person[];
  selectedPerson: Person;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getPeople()
      .subscribe(people => this.people = people);
  }

  selectPerson(people: Person) {
    this.selectedPerson = people;
  };
}
