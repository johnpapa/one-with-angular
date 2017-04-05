import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RebelsComponent } from './rebels/rebels.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'rebels', },
  { path: 'rebels', component: RebelsComponent },
  { path: 'planets', loadChildren: 'app/planets/planets.module#PlanetsModule' },
  { path: '**', pathMatch: 'full', redirectTo: 'rebels' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
