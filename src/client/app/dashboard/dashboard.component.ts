import { Component, OnInit, OnDestroy } from '@angular/core';
import { MdSnackBar, MdSnackBarConfig } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/observable/combineLatest';

import { DataService, ChartOptions, ConfigService, SummaryData } from '../core';

@Component({
  selector: 'ro-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnDestroy, OnInit {
  planetChart = new ChartOptions();
  allegianceChart = new ChartOptions();
  planetSummary: SummaryData[];
  allegianceSummary: SummaryData[];

  private subscription: Subscription;

  constructor(
    public snackBar: MdSnackBar,
    private configService: ConfigService,
    private dataService: DataService
  ) {}

  setChartOptions() {
    this.planetChart.xAxisLabel = 'Planets';
    this.planetChart.yAxisLabel = 'Characters';
    this.allegianceChart.xAxisLabel = 'Allegiance';
    this.allegianceChart.yAxisLabel = 'Characters';
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngOnInit() {
    this.setChartOptions();

    this.subscription = Observable.combineLatest(
      this.dataService.getPlanetSummary(),
      this.dataService.getAllegianceSummary()
    ).subscribe(
      ([planetSummary, allegianceSummary]) => {
        this.planetSummary = planetSummary;
        this.allegianceSummary = allegianceSummary;
        // TODO: fix this this.snackBar.open('Dashboard loaded', 'SUCCESS', this.configService.snackConfig);
      },
      err => {
        // TODO: fix this this.snackBar.open('Dashboard failed', 'ERROR', this.configService.snackConfig);
        console.log(err);
      }
    );
  }
}
