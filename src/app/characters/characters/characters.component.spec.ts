import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { MdSnackBar } from '@angular/material';

import { CharactersComponent } from './characters.component';
import { DataService } from '../../core';
import * as testing from '../../../testing';

describe('CharactersComponent', () => {
  let component: CharactersComponent;
  let fixture: ComponentFixture<CharactersComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CharactersComponent],
      providers: [
        { provide: DataService, useClass: testing.DataServiceStub },
        { provide: MdSnackBar, useClass: testing.MdSnackBarStub }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharactersComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('before detectChanges', () => {
    it('should not have characters', () => {
      expect(component.characters).toBeUndefined();
    });
  });

  describe('after detectChanges', () => {
    beforeEach(() => {
      fixture.detectChanges();
    });

    it('should contain Characters heading', () => {
      de = fixture.debugElement.query(By.css('h2'));
      el = de.nativeElement;
      expect(el.textContent).toContain('Characters');
    });

    it('should have characters', () => {
      expect(component.characters.length).toBe(testing.characters.length);
    });
  });
});
