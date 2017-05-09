import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, NO_ERRORS_SCHEMA, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { MdSnackBar } from '@angular/material';
import { AdvancedPieChartComponent, BarComponent } from '@swimlane/ngx-charts';
import { of } from 'rxjs/observable/of';

import { DashboardComponent } from './dashboard.component';
import { DataService } from '../core/data.service';
import { DataServiceStub, MdSnackBarStub } from '../../test-helpers';
import { Planet } from '../core/models/planet';

@Component({
  selector: 'ngx-charts-advanced-pie-chart',
  template: ''
})
export class NGXChartsAdvancedPieFake { }

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardComponent, NGXChartsAdvancedPieFake],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: DataService, useClass: DataServiceStub },
        { provide: MdSnackBar, useClass: MdSnackBarStub }
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;

    const dataService = TestBed.get(DataService);
    const allegiances = [
      'jedi',
      'sith',
      'rebel',
    ];
    const planets = [
      new Planet(1, 'planet1'),
      new Planet(2, 'planet2'),
      new Planet(3, 'planet3'),
    ];

    dataService.getAllegianceSummary.and.returnValue(of(allegiances));
    dataService.getPlanetSummary.and.returnValue(of(planets));

    // let deTab = fixture.debugElement.query(By.css('md-tab')); // it can find this
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('before detectChanges', () => {
    it('should not have planets', () => {
      expect(component.planetSummary).toBeUndefined();
    });

    it('should not have allegiances', () => {
      expect(component.allegianceSummary).toBeUndefined();
    });

    it('should not have allegiance pie chart', () => {
      const de = fixture.debugElement.query(By.directive(AdvancedPieChartComponent));
      expect(de).toBeFalsy();
      // el = de.nativeElement;
    });

    it('should not have planets bar chart', () => {
      const de = fixture.debugElement.query(By.directive(BarComponent));
      expect(de).toBeFalsy();
    });
  });

  describe('after detectChanges', () => {
    beforeEach(() => {
      fixture.detectChanges();
    });

    it('should have planets', () => {
      expect(component.planetSummary.length).toBe(3);
    });

    it('should have allegiances', () => {
      expect(component.allegianceSummary.length).toBe(3);
    });

    it('should have allegiance pie chart', () => {
      const de = fixture.debugElement.query(By.css('ngx-charts-advanced-pie-chart'));
      expect(de).toBeDefined();
    });

    it('should have planets bar chart', () => {
      const de = fixture.debugElement.query(By.directive(BarComponent));
      expect(de).toBeDefined()
    });
  });

});
