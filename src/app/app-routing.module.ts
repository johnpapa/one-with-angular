import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CharactersComponent } from './characters/characters.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'characters', },
  { path: 'characters', component: CharactersComponent },
  { path: 'planets', loadChildren: 'app/planets/planets.module#PlanetsModule' },
  { path: '**', pathMatch: 'full', redirectTo: 'characters' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
