import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MdSnackBar } from '@angular/material';

import { PlanetsComponent } from './planets.component';
import { DataService } from '../../core/data.service';
import { DataServiceStub, MdSnackBarStub } from '../../../test-helpers';

describe('PlanetsComponent', () => {
  let component: PlanetsComponent;
  let fixture: ComponentFixture<PlanetsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanetsComponent ],
      providers: [
        { provide: DataService, useClass: DataServiceStub },
        { provide: MdSnackBar, useClass: MdSnackBarStub }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
