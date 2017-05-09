import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { Character } from '../app/core/models/character';
import { Planet } from '../app/core/models/planet';
import { SummaryData } from '../app/core/models/summary-data';
import * as mocks from 'testing/mock-data';

export class DataServiceStub {
  getCharacters = jasmine.createSpy('getCharacters').and.returnValue(of(mocks.characters));
  getPlanets = jasmine.createSpy('getPlanets').and.returnValue(of(mocks.planets));
  getAllegiances = jasmine.createSpy('getAllegiances').and.returnValue(of(mocks.allegiances));
  getPlanetSummary = jasmine.createSpy('getPlanetSummary').and.returnValue(of(mocks.planetSummary));
  getAllegianceSummary = jasmine.createSpy('getAllegianceSummary').and.returnValue(of(mocks.allegianceSummary));
}
