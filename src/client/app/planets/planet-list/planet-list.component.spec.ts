import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { MdSnackBar } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';

import { PlanetListComponent } from './planet-list.component';
import { ConfigService, DataService } from '../../core';
import * as testing from '../../../testing';

describe('PlanetListComponent', () => {
  let component: PlanetListComponent;
  let fixture: ComponentFixture<PlanetListComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([])],
      declarations: [PlanetListComponent],
      providers: [
        ConfigService,
        { provide: DataService, useClass: testing.DataServiceStub },
        { provide: MdSnackBar, useClass: testing.MdSnackBarStub }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });

    fixture = TestBed.createComponent(PlanetListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('before detectChanges', () => {
    it('should not have planets', () => {
      expect(component.planets).toBeUndefined();
    });

    it('should not open the snack bar', () => {
      expect(component.snackBar.open).not.toHaveBeenCalled();
    });
  });

  describe('after detectChanges', () => {
    beforeEach(() => {
      fixture.detectChanges();
    });

    it('should contain Planets heading', () => {
      de = fixture.debugElement.query(By.css('h2'));
      el = de.nativeElement;
      expect(el.textContent).toContain('Planets');
    });

    it('should have planets', () => {
      expect(component.planets.length).toBe(testing.planets.length);
    });

    it('should open the snack bar', () => {
      expect(component.snackBar.open).toHaveBeenCalledTimes(1);
    });

    it('should set selected planet when clicked', () => {
      const planet = testing.planets[0];
      de = fixture.debugElement.query(By.css('md-list-item'));
      el = de.nativeElement;
      el.click();
      expect(component.selectedPlanet).toBe(planet);
    });

    it('should not set selected planet when not clicked', () => {
      const planet = testing.planets[0];
      de = fixture.debugElement.query(By.css('md-list-item'));
      el = de.nativeElement;
      expect(component.selectedPlanet).not.toBe(planet);
    });
  });
});
