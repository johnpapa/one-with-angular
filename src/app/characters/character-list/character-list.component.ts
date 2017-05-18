import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MdSnackBar, MdSnackBarConfig } from '@angular/material';

import { Character, ConfigService, DataService } from '../../core';

@Component({
  selector: 'ro-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.scss']
})
export class CharacterListComponent implements OnInit {
  title = 'Characters';
  characters: Character[];
  selectedCharacter: Character;

  constructor(
    public snackBar: MdSnackBar,
    private configService: ConfigService,
    private dataService: DataService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.dataService.getCharacters()
      .subscribe(pkg => {
        this.characters = pkg.data;
        this.snackBar.open('Getting Characters data succeeded', 'HTTP', this.configService.snackConfig);
      },
      () => this.snackBar.open('Getting Characters data failed', 'ERROR', this.configService.snackConfig),
    );
  }

  selectCharacter(character: Character) {
    this.selectedCharacter = character;
    this.router.navigate(['characters', character.id]);
    console.log(character);
  }
}
