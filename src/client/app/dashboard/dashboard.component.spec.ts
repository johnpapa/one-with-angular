import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, NO_ERRORS_SCHEMA, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { MdSnackBar } from '@angular/material';
import { AdvancedPieChartComponent, BarComponent } from '@swimlane/ngx-charts';

import { DashboardComponent } from './dashboard.component';
import { ConfigService, DataService } from '../core';
import * as testing from '../../testing';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ngx-charts-advanced-pie-chart',
  template: ''
})
export class FakeNGXChartsAdvancedPieComponent { }

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let de: DebugElement;
  // let el: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardComponent, FakeNGXChartsAdvancedPieComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        ConfigService,
        { provide: DataService, useClass: testing.DataServiceStub },
        { provide: MdSnackBar, useClass: testing.MdSnackBarStub }
      ],
    });

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;

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
      de = fixture.debugElement.query(By.directive(AdvancedPieChartComponent));
      expect(de).toBeFalsy();
      // el = de.nativeElement;
    });

    it('should not have planets bar chart', () => {
      de = fixture.debugElement.query(By.directive(BarComponent));
      expect(de).toBeFalsy();
    });

    it('should not open the snack bar', () => {
      expect(component.snackBar.open).not.toHaveBeenCalled();
    });
  });

  describe('after detectChanges', () => {
    beforeEach(() => {
      fixture.detectChanges();
    });

    it('should have planets in the planet summary', () => {
      expect(component.planetSummary.length).toBe(testing.planetSummary.length);
    });

    it('should have allegiances in the allegiances summary', () => {
      expect(component.allegianceSummary.length).toBe(testing.allegianceSummary.length);
    });

    it('should have allegiance pie chart', () => {
      de = fixture.debugElement.query(By.directive(AdvancedPieChartComponent));
      expect(de).toBeDefined();
    });

    it('should have planets bar chart', () => {
      de = fixture.debugElement.query(By.directive(BarComponent));
      expect(de).toBeDefined();
    });

    it('should open the snack bar', () => {
      expect(component.snackBar.open).toHaveBeenCalledTimes(1);
    });
  });

});
