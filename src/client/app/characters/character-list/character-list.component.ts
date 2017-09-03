import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { MdSnackBar, MdSnackBarConfig } from '@angular/material';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';

import { Character, ConfigService, DataService } from '../../core';

@Component({
  selector: 'ro-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.scss']
})
export class CharacterListComponent implements OnDestroy, OnInit {
  title = 'Characters';
  characters: Character[];
  selectedCharacter: Character;

  // Prevent memory leaks with the subject/takeUntil pattern
  // This is best when the component has multiple subscribes
  private onDestroy = new Subject();

  constructor(
    public snackBar: MdSnackBar,
    private configService: ConfigService,
    private dataService: DataService,
    private router: Router
  ) {}

  ngOnDestroy() {
    this.onDestroy.next();
  }

  ngOnInit() {
    this.dataService
      .getCharacters()
      .takeUntil(this.onDestroy)
      .subscribe(characters => {
        this.characters = characters;
        // TODO: fix this this.snackBar.open('Getting Characters data succeeded', 'SUCCESS', this.configService.snackConfig);
      });
    // TODO: fix this () => this.snackBar.open('Getting Characters data failed', 'ERROR', this.configService.snackConfig),
  }

  selectCharacter(character: Character) {
    this.selectedCharacter = character;
    this.router.navigate(['characters', character.id]);
    console.log(character);
  }
}
