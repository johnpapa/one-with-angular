import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, NO_ERRORS_SCHEMA, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { MdSnackBar } from '@angular/material';
import { AdvancedPieChartComponent, BarComponent } from '@swimlane/ngx-charts';
import { of } from 'rxjs/observable/of';
import * as mocks from '../../testing/mock-data';

import { DashboardComponent } from './dashboard.component';
import { DataService } from '../core/data.service';
import { DataServiceStub } from '../../testing/data.service';
import { MdSnackBarStub } from '../../testing/snackbar.service';

@Component({
  selector: 'ngx-charts-advanced-pie-chart',
  template: ''
})
export class FakeNGXChartsAdvancedPieComponent { }

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardComponent, FakeNGXChartsAdvancedPieComponent],
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

    it('should have planets in the planet summary', () => {
      expect(component.planetSummary.length).toBe(mocks.planetSummary.length);
    });

    it('should have allegiances in the allegiances summary', () => {
      expect(component.allegianceSummary.length).toBe(mocks.allegianceSummary.length);
    });

    it('should have allegiance pie chart', () => {
      const de = fixture.debugElement.query(By.directive(AdvancedPieChartComponent));
      expect(de).toBeDefined();
    });

    it('should have planets bar chart', () => {
      const de = fixture.debugElement.query(By.directive(BarComponent));
      expect(de).toBeDefined();
    });
  });

});
