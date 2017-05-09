import { Component, OnInit } from '@angular/core';

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

  constructor(private dataService: DataService) { }

  setChartOptions() {
    this.planetChart.xAxisLabel = 'Planets';
    this.planetChart.yAxisLabel = 'Characters';
    this.allegianceChart.xAxisLabel = 'Allegiance';
    this.allegianceChart.yAxisLabel = 'Characters';
  }

  ngOnInit() {
    this.setChartOptions();

    this.dataService.getPlanetSummary()
      .subscribe(summary => this.planetSummary = summary);

    this.dataService.getAllegianceSummary()
      .subscribe(summary =>  this.allegianceSummary = summary);
  }
}
