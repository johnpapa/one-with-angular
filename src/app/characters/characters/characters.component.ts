import { Component, OnInit } from '@angular/core';
import { MdSnackBar, MdSnackBarConfig } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { Character, ConfigService, DataService } from '../../core';
import { CharactersState } from '../../core/reducers.service';
import { ActionsService } from '../../core/actions.service';

@Component({
  selector: 'ro-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.scss']
})
export class CharactersComponent implements OnInit {
  characters: Observable<Character[]>;
  title = 'Characters';
  // characters: Character[];
  selectedCharacter: Character;

  constructor(public snackBar: MdSnackBar,
    private configService: ConfigService,
    private dataService: DataService,
    private actionsService: ActionsService,
    private store: Store<CharactersState>
  ) { }

  ngOnInit() {
    this.characters = this.store.select('characters');

    this.characters.subscribe(
      () => this.snackBar.open('Characters failed!', 'ERROR', this.configService.snackConfig),
      () => this.snackBar.open('Characters Loaded!', 'HTTP', this.configService.snackConfig)
    );

    this.store.dispatch(this.actionsService.getCharacters());
  }

  selectCharacter(character: Character) {
    this.selectedCharacter = character;
  };
}
