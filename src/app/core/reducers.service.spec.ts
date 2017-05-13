import { TestBed, inject } from '@angular/core/testing';

import { ReducersService } from './reducers.service';

describe('ReducersService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReducersService]
    });
  });

  it('should ...', inject([ReducersService], (service: ReducersService) => {
    expect(service).toBeTruthy();
  }));
});
