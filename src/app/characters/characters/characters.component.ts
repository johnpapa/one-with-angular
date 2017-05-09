import { Component, OnInit } from '@angular/core';
import { MdSnackBar, MdSnackBarConfig } from '@angular/material';

import { Character, DataService } from '../../core';

@Component({
  selector: 'ro-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.scss']
})
export class CharactersComponent implements OnInit {
  title = 'Characters';
  characters: Character[];
  selectedCharacter: Character;

  constructor(public snackBar: MdSnackBar, private dataService: DataService) { }

  ngOnInit() {
    const config = new MdSnackBarConfig();
    config.duration = 2500;

    this.dataService.getCharacters()
      .subscribe(
        characters => this.characters = characters,
        () => this.snackBar.open('Characters failed!', 'ERROR', config),
        () => this.snackBar.open('Characters Loaded!', 'HTTP', config)
      );
  }

  selectCharacter(characters: Character) {
    this.selectedCharacter = characters;
  };
}
