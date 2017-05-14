import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CharacterDetailComponent } from './character-detail/character-detail.component';
import { CharacterListComponent } from './character-list/character-list.component';
import { CharactersComponent } from './characters.component';

const routes: Routes = [
  {
    path: '', component: CharactersComponent, children: [
      {
        path: '', component: CharacterListComponent, children: [
          { path: ':id', component: CharacterDetailComponent },
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CharactersRoutingModule { }
