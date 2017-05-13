import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';

import { Character } from './models/character';
import { Planet } from './models/planet';

@Injectable()
export class ActionsService {
    static GET_CHARACTERS = '[Character] Get Characters';
    getCharacters(): Action {
        return {
            type: ActionsService.GET_CHARACTERS
        };
    }

    static GET_CHARACTERS_SUCCESS = '[Character] Get Characters Success';
    getCharactersSuccess(characters): Action {
        return {
            type: ActionsService.GET_CHARACTERS_SUCCESS,
            payload: characters
        };
    }

    static GET_ALLEGIANCES = '[Allegiance] Get Allegiances';
    getAllegiances(): Action {
        return {
            type: ActionsService.GET_ALLEGIANCES
        };
    }

    static GET_ALLEGIANCES_SUCCESS = '[Allegiance] Get Allegiances Success';
    getAllegiancesSuccess(allegiances): Action {
        return {
            type: ActionsService.GET_ALLEGIANCES_SUCCESS,
            payload: allegiances
        };
    }

    static GET_PLANETS = '[Planet] Get Planets';
    getPlanets(): Action {
        return {
            type: ActionsService.GET_PLANETS
        };
    }

    static GET_PLANETS_SUCCESS = '[Planet] Get Planets Success';
    getPlanetsSuccess(planets): Action {
        return {
            type: ActionsService.GET_PLANETS_SUCCESS,
            payload: planets
        };
    }

    // static GET_CHARACTER = '[Character] Get Character';
    // getCharacter(id): Action {
    //     return {
    //         type: ActionsService.GET_CHARACTER,
    //         payload: id
    //     };
    // }

    // static GET_CHARACTER_SUCCESS = '[Character] Get Character Success';
    // getCharacterSuccess(character): Action {
    //     return {
    //         type: ActionsService.GET_CHARACTER_SUCCESS,
    //         payload: character
    //     };
    // }
}
