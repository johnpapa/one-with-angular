import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { RebelsComponent } from './rebels.component';
import { DataService } from '../data.service';

class DataServiceStub {
  getRebels() { return []; }
  getPlanets() { return []; }
}

describe('RebelsComponent', () => {
  let component: RebelsComponent;
  let fixture: ComponentFixture<RebelsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RebelsComponent ],
      providers: [{ provide: DataService, useClass: DataServiceStub }],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RebelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
