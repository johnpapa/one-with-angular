import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { MdSnackBar, MdSnackBarConfig } from '@angular/material';
import 'rxjs/add/observable/combineLatest';

import { DataService, ChartOptions, ConfigService, SummaryData } from '../core';

@Component({
  selector: 'ro-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  planetChart = new ChartOptions();
  allegianceChart = new ChartOptions();
  planetSummary: SummaryData[];
  allegianceSummary: SummaryData[];

  constructor(
    public snackBar: MdSnackBar,
    private configService: ConfigService,
    private dataService: DataService) { }

  setChartOptions() {
    this.planetChart.xAxisLabel = 'Planets';
    this.planetChart.yAxisLabel = 'Characters';
    this.allegianceChart.xAxisLabel = 'Allegiance';
    this.allegianceChart.yAxisLabel = 'Characters';
  }

  ngOnInit() {
    this.setChartOptions();

    Observable.combineLatest(
      this.dataService.getPlanetSummary(),
      this.dataService.getAllegianceSummary()
    )
      .subscribe(
        ([planetSummary, allegianceSummary]) => {
          this.planetSummary = planetSummary;
          this.allegianceSummary = allegianceSummary;
          this.snackBar.open('Dashboard loaded', 'HTTP', this.configService.snackConfig);
        },
        () => this.snackBar.open('Dashboard failed', 'ERROR', this.configService.snackConfig)
      );
  }
}
