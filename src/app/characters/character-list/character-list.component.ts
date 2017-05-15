import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MdSnackBar, MdSnackBarConfig } from '@angular/material';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { Character, ConfigService, DataService } from '../../core';
import { ActionsService } from '../../core/actions.service';
import { CharactersState } from '../../core/reducers.service';

@Component({
  selector: 'ro-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.scss']
})
export class CharacterListComponent implements OnInit {
  title = 'Characters';
  characters: Observable<Character[]>;
  selectedCharacter: Character;

  constructor(
    public snackBar: MdSnackBar,
    private configService: ConfigService,
    private dataService: DataService,
    private router: Router,
    private actionsService: ActionsService,
    private store: Store<CharactersState>
  ) { }

  ngOnInit() {
    this.characters = this.store.select('characters');

    this.characters.subscribe(
      () => this.snackBar.open('Getting Characters data succeeded', 'HTTP', this.configService.snackConfig),
      () => this.snackBar.open('Getting Characters data failed', 'ERROR', this.configService.snackConfig)
    );

    this.store.dispatch(this.actionsService.getCharacters());
  }

  selectCharacter(character: Character) {
    this.selectedCharacter = character;
    this.router.navigate(['characters', character.id]);
    console.log(character);
  }
}
