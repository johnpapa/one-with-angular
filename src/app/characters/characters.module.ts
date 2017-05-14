import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { CharactersRoutingModule } from './characters-routing.module';
import { CharacterDetailComponent } from './character-detail/character-detail.component';
import { CharacterListComponent } from './character-list/character-list.component';
import { CharactersComponent } from './characters.component';

@NgModule({
  imports: [
    SharedModule,
    CharactersRoutingModule,
  ],
  declarations: [
    CharactersComponent,
    CharacterListComponent,
    CharacterDetailComponent,
  ]
})
export class CharactersModule { }
