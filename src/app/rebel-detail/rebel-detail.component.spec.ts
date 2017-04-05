import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { RebelDetailComponent } from './rebel-detail.component';
import { DataService } from '../data.service';

class DataServiceStub {
  getRebels() { return []; }
  getPlanets() { return []; }
}

describe('RebelDetailComponent', () => {
  let component: RebelDetailComponent;
  let fixture: ComponentFixture<RebelDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RebelDetailComponent ],
      providers: [{ provide: DataService, useClass: DataServiceStub }],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RebelDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
