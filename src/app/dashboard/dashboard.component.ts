import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { MdSnackBar, MdSnackBarConfig } from '@angular/material';

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

    Observable.forkJoin(this.dataService.getPlanetSummary(), this.dataService.getAllegianceSummary())
      .subscribe(
        (summaries) => {
          this.planetSummary = summaries[0];
          this.allegianceSummary = summaries[1];
          this.snackBar.open('Dashboard loaded', 'HTTP', this.configService.snackConfig);
        },
        () => this.snackBar.open('Dashboard failed', 'ERROR', this.configService.snackConfig)
      );
  }
}
