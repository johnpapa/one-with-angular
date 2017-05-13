import { TestBed, inject } from '@angular/core/testing';

import { EffectsService } from './effects.service';

describe('EffectsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EffectsService]
    });
  });

  it('should ...', inject([EffectsService], (service: EffectsService) => {
    expect(service).toBeTruthy();
  }));
});
