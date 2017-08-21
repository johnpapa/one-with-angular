export class ChartOptions {
  public view: any[];
  public showXAxis: boolean;
  public showYAxis: boolean;
  public gradient: boolean;
  public showLegend: boolean;
  public showXAxisLabel: boolean;
  public xAxisLabel: string;
  public showYAxisLabel: boolean;
  public yAxisLabel: string;
  public colorScheme: any;
  public explodeSlices: boolean;
  public labels: boolean;
  public doughnut: boolean;
  public showLabels: boolean;

  constructor() {
    // Defaults
    this.view = [700, 400];
    this.showXAxis = true;
    this.showYAxis = true;
    this.gradient = false;
    this.showLegend = false;
    this.showXAxisLabel = false;
    this.showYAxisLabel = true;

    // Pie options
    this.explodeSlices = false;
    this.labels = true;
    this.doughnut = false;
    this.showLabels = true;

    this.colorScheme = {
      domain: [
        '#ad1457',
        '#1565c0',
        '#d81b60',
        '#1e88e5',
        '#ec407a',
        '#42a5f5',
        '#f48fb1',
        '#90caf9',
      ]
    };
  }
}
