import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, NO_ERRORS_SCHEMA, DebugElement } from '@angular/core';
import { MdSnackBar, MdSnackBarConfig } from '@angular/material';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

import { PlanetDetailComponent } from './planet-detail.component';
import { DataService, ConfigService, Planet } from '../../core';
import * as testing from '../../../testing';

describe('PlanetDetailComponent', () => {
  let component: PlanetDetailComponent;
  let fixture: ComponentFixture<PlanetDetailComponent>;
  let detailDebugEl: DebugElement;
  // let detailEl: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([])],
      declarations: [PlanetDetailComponent],
      providers: [
        ConfigService,
        { provide: DataService, useClass: testing.DataServiceStub },
        { provide: MdSnackBar, useClass: testing.MdSnackBarStub }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });

    fixture = TestBed.createComponent(PlanetDetailComponent);
    component = fixture.componentInstance;
    detailDebugEl = fixture.debugElement.query(By.css('.planet-detail input[placeholder=Name]'));

    fixture = TestBed.createComponent(PlanetDetailComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not have a planet', () => {
    expect(component.planet).toBeUndefined();
  });
});
