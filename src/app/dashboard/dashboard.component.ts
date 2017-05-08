import { Component, OnInit } from '@angular/core';

import { DataService } from '../data.service';

@Component({
  selector: 'ro-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  // planetSummary2: { name: string, value: number }[] = [{ name: 'jedha', value: 22 }, {name: 'dagobah', value: 89}];
  planetSummary: { name: string, value: number }[];

  // options
  view: any[] = [700, 400];
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = false;
  showXAxisLabel = false;
  xAxisLabel = 'Planets';
  showYAxisLabel = true;
  yAxisLabel = 'Characters';

  colorScheme = {
    // domain: ['#bbdefb', '#90caf9', '#64b5f6', '#42a5f5', '#2196f3', '#1e88e5', '#1976d2', '#1565c0']
    domain: ['#90caf9', '#42a5f5', '#1e88e5', '#1565c0']
  };

  onSelect(event) {
    console.log(event);
  }

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getPlanetSummary()
      .subscribe(summary => {
        this.planetSummary = summary; // summary.slice(0, 2);
        console.log(this.planetSummary);
      });
  }

}
