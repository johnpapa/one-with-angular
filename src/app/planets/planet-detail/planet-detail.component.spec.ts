import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, NO_ERRORS_SCHEMA, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { PlanetDetailComponent } from './planet-detail.component';
import { DataService, Planet } from '../../core';
import * as testing from '../../../testing';

@Component({
  template: '<ro-planet-detail [planet]="selectedPlanet"></ro-planet-detail>'
})
class TestHostComponent {
  selectedPlanet: Planet = testing.planets[0];
}

describe('PlanetDetailComponent', () => {
  let component: PlanetDetailComponent;
  let fixture: ComponentFixture<PlanetDetailComponent>;
  let hostFixture: ComponentFixture<TestHostComponent>;
  let testHostComponent: TestHostComponent;
  let detailDebugEl: DebugElement;
  // let detailEl: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PlanetDetailComponent, TestHostComponent],
      providers: [{ provide: DataService, useClass: testing.DataServiceStub }],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    hostFixture = TestBed.createComponent(TestHostComponent);
    testHostComponent = hostFixture.componentInstance;
    detailDebugEl = hostFixture.debugElement.query(By.css('.planet-detail input[placeholder=Name]'));

    fixture = TestBed.createComponent(PlanetDetailComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not have a planet', () => {
    expect(component.planet).toBeUndefined();
  });

  it('should set the character input ', () => {
    expect(detailDebugEl.nativeElement.ngModel).not.toContain(testHostComponent.selectedPlanet.name);
    hostFixture.detectChanges();
    expect(detailDebugEl.nativeElement.ngModel).toContain(testHostComponent.selectedPlanet.name);
  });
});
