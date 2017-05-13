import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';

import { CharactersState } from './reducers.service';
import { ActionsService } from './actions.service';
import { DataService } from './data.service';

@Injectable()
export class EffectsService {
    constructor (
        private update$: Actions,
        private actionsService: ActionsService,
        private dataService: DataService
    ) {}

    @Effect() loadCharacters$ = this.update$
        .ofType(ActionsService.GET_CHARACTERS)
        .switchMap(() => this.dataService.getCharacters())
        .map(characters => this.actionsService.getCharactersSuccess(characters));

    @Effect() loadPlanets$ = this.update$
        .ofType(ActionsService.GET_PLANETS)
        .switchMap(() => this.dataService.getPlanets())
        .map(planets => this.actionsService.getPlanetsSuccess(planets));

    @Effect() loadAllegiances$ = this.update$
        .ofType(ActionsService.GET_ALLEGIANCES)
        .switchMap(() => this.dataService.getAllegiances())
        .map(allegiances => this.actionsService.getAllegiancesSuccess(allegiances));
}
