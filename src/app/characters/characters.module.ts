import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import {
//   MdCheckboxModule,
//   MdInputModule,
//   MdListModule,
//   MdProgressSpinnerModule,
// } from '@angular/material';

import { SharedModule } from '../shared/shared.module';
import { CharactersRoutingModule } from './characters-routing.module';
import { CharactersComponent } from './characters/characters.component';
import { CharacterDetailComponent } from './character-detail/character-detail.component';

@NgModule({
  imports: [
    // CommonModule,
    // FormsModule,
    SharedModule,
    // MdListModule,
    // MdCheckboxModule,
    // MdInputModule,
    // MdProgressSpinnerModule,
    CharactersRoutingModule,
  ],
  declarations: [
    CharactersComponent,
    CharacterDetailComponent,
  ]
})
export class CharactersModule { }
