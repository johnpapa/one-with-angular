import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { MdSnackBar, MdSnackBarConfig } from '@angular/material';

import { DataService } from '../core/data.service';
import { ChartOptions } from '../core/models/chart-options';
import { SummaryData } from '../core/models/summary-data';

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

  constructor(public snackBar: MdSnackBar, private dataService: DataService) { }

  setChartOptions() {
    this.planetChart.xAxisLabel = 'Planets';
    this.planetChart.yAxisLabel = 'Characters';
    this.allegianceChart.xAxisLabel = 'Allegiance';
    this.allegianceChart.yAxisLabel = 'Characters';
  }

  ngOnInit() {
    this.setChartOptions();

    const config = new MdSnackBarConfig();
    config.duration = 2500;

    Observable.forkJoin(this.dataService.getPlanetSummary(), this.dataService.getAllegianceSummary())
      .subscribe(
        (summaries) => {
          this.planetSummary = summaries[0];
          this.allegianceSummary = summaries[1];
        },
        () => this.snackBar.open('Dashboard failed!', 'ERROR', config),
        () => this.snackBar.open('Dashboard Loaded!', 'HTTP', config)
      );
  }
}
