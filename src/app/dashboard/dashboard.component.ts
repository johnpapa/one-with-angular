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
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Planet';
  showYAxisLabel = true;
  yAxisLabel = 'Population';

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
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
