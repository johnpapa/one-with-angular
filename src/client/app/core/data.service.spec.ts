import { TestBed, inject } from '@angular/core/testing';
import {
  HttpModule,
  Http,
  Response,
  ResponseOptions,
  XHRBackend
} from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { ConfigService } from './config.service';
import { DataService } from './data.service';

describe('DataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        ConfigService,
        DataService,
        { provide: XHRBackend, useClass: MockBackend }
      ]
    });
  });

  it('should create', inject([DataService], (service: DataService) => {
    expect(service).toBeTruthy();
  }));


  it('should return an Observable<string[]>',
    inject([DataService, XHRBackend], (dataService, mockBackend) => {
      const mockResponse = {
        results: [
          'jedi',
          'sith',
          'rebel',
        ]
      };

      mockBackend.connections.subscribe((connection) => {
        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(mockResponse)
        })));
      });

      dataService.getAllegiances().subscribe((allegiances) => {
        expect(allegiances.length).toBe(3);
        expect(allegiances).toContain('jedi');
        expect(allegiances).toContain('sith');
        expect(allegiances).toContain('rebel');
        expect(allegiances).not.toContain('droid');
      });
    }));
});
