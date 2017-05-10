import { Component, OnInit } from '@angular/core';
import { MdSnackBar, MdSnackBarConfig } from '@angular/material';

import { Character, ConfigService, DataService } from '../../core';

@Component({
  selector: 'ro-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.scss']
})
export class CharactersComponent implements OnInit {
  title = 'Characters';
  characters: Character[];
  selectedCharacter: Character;

  constructor(public snackBar: MdSnackBar,
    private configService: ConfigService,
    private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getCharacters()
      .subscribe(
        characters => this.characters = characters,
        () => this.snackBar.open('Characters failed!', 'ERROR', this.configService.snackConfig),
        () => this.snackBar.open('Characters Loaded!', 'HTTP', this.configService.snackConfig)
      );
  }

  selectCharacter(characters: Character) {
    this.selectedCharacter = characters;
  };
}
