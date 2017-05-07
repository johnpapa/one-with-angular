import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { CharactersDetailComponent } from './character-detail.component';
import { DataService } from '../data.service';

class DataServiceStub {
  getCharacters() { return []; }
  getPlanets() { return []; }
}

describe('CharactersDetailComponent', () => {
  let component: CharactersDetailComponent;
  let fixture: ComponentFixture<CharactersDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CharactersDetailComponent ],
      providers: [{ provide: DataService, useClass: DataServiceStub }],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharactersDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
