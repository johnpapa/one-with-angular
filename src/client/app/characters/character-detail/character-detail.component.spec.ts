import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, NO_ERRORS_SCHEMA, DebugElement } from '@angular/core';
import { MdSnackBar, MdSnackBarConfig } from '@angular/material';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

import { CharacterDetailComponent } from './character-detail.component';
import { Character, ConfigService, DataService } from '../../core';
import * as testing from '../../../testing';

describe('CharactersDetailComponent', () => {
  let component: CharacterDetailComponent;
  let fixture: ComponentFixture<CharacterDetailComponent>;
  let detailDebugEl: DebugElement;
  // let detailEl: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([])],
      declarations: [CharacterDetailComponent],
      providers: [
        ConfigService,
        { provide: DataService, useClass: testing.DataServiceStub },
        { provide: MdSnackBar, useClass: testing.MdSnackBarStub }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });

    fixture = TestBed.createComponent(CharacterDetailComponent);
    component = fixture.componentInstance;
    detailDebugEl = fixture.debugElement.query(By.css('.character-detail input[placeholder=Name]'));

    fixture = TestBed.createComponent(CharacterDetailComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not have a character', () => {
    expect(component.character).toBeUndefined();
  });
});
