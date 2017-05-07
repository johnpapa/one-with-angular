import { Component, OnInit } from '@angular/core';

import { Character } from '../character';
import { DataService } from '../data.service';

@Component({
  selector: 'ro-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.scss']
})
export class CharactersComponent implements OnInit {
  title = 'Characters';
  characters: Character[];
  selectedCharacter: Character;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getCharacters()
      .subscribe(characters => this.characters = characters);
  }

  selectCharacter(characters: Character) {
    this.selectedCharacter = characters;
  };
}
