import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { MdSnackBar } from '@angular/material';

import { CharactersComponent } from './characters.component';
import { ConfigService, DataService } from '../../core';
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
        ConfigService,
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

    it('should not open the snack bar', () => {
      expect(component.snackBar.open).not.toHaveBeenCalled();
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

    it('should open the snack bar', () => {
      expect(component.snackBar.open).toHaveBeenCalledTimes(1);
    });

    it('should set selected character when clicked', () => {
      const character = testing.characters[0];
      de = fixture.debugElement.query(By.css('md-list-item'));
      el = de.nativeElement;
      el.click();
      expect(component.selectedCharacter).toBe(character);
    });

    it('should not set selected character when not clicked', () => {
      const character = testing.characters[0];
      de = fixture.debugElement.query(By.css('md-list-item'));
      el = de.nativeElement;
      expect(component.selectedCharacter).not.toBe(character);
    });
  });
});
