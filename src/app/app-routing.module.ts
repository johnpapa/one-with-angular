import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PeopleComponent } from './people/people.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'people', },
  { path: 'people', component: PeopleComponent },
  { path: 'planets', loadChildren: 'app/planets/planets.module#PlanetsModule' },
  { path: '**', pathMatch: 'full', redirectTo: 'people' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
