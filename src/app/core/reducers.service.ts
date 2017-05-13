import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { compose } from '@ngrx/core/compose';
import { combineReducers } from '@ngrx/store';

import { Character } from './models/character';
import { Planet } from './models/planet';
import { ActionsService } from './actions.service';

export type CharactersState = Character[];
export type PlanetsState = Planet[];
export type AllegiancesState = string[];

const initialCharactersState: CharactersState = [];
const initialPlanetsState: PlanetsState = [];
const initialAllegiancesState: AllegiancesState = [];

export function charactersReducer (state = initialCharactersState, action: Action): CharactersState {
    switch (action.type) {
        case ActionsService.GET_CHARACTERS_SUCCESS: {
            return action.payload;
        }
        default: {
            return state;
        }
    }
}
export function planetsReducer (state = initialPlanetsState, action: Action): PlanetsState {
    switch (action.type) {
        case ActionsService.GET_PLANETS_SUCCESS: {
            return action.payload;
        }
        default: {
            return state;
        }
    }
}
export function allegiancesReducer (state = initialAllegiancesState, action: Action): AllegiancesState {
    switch (action.type) {
        case ActionsService.GET_ALLEGIANCES_SUCCESS: {
            return action.payload;
        }
        default: {
            return state;
        }
    }
}

export interface AppState {
    characters: CharactersState;
    planets: PlanetsState;
    allegiances: AllegiancesState;
};

export default compose(combineReducers)({
    characters: charactersReducer,
    planets: planetsReducer,
    allegiances: allegiancesReducer,
});

