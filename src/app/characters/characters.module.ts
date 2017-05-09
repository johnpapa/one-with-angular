import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { CharactersRoutingModule } from './characters-routing.module';
import { CharactersComponent } from './characters/characters.component';
import { CharacterDetailComponent } from './character-detail/character-detail.component';

@NgModule({
  imports: [
    SharedModule,
    CharactersRoutingModule,
  ],
  declarations: [
    CharactersComponent,
    CharacterDetailComponent,
  ]
})
export class CharactersModule { }
