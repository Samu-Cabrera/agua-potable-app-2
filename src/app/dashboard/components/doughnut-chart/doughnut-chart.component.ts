import { TitleCasePipe } from '@angular/common';
import { Component, OnInit, ElementRef, ViewChild, input, effect, output } from '@angular/core';
import { Chart, registerables } from "chart.js";

interface FinancialData {
  year?: number;
  data1: number;
  data2: number;
}

@Component({
  selector: 'doughnut-chart',
  standalone: true,
  imports: [
    TitleCasePipe
  ],
  templateUrl: './doughnut-chart.component.html',
  styleUrl: './doughnut-chart.component.scss'
})
export class DoughnutChartComponent implements OnInit {

  @ViewChild("doughnutChart") chartCanvas!: ElementRef<HTMLCanvasElement>;

  public yearSelected = output<number>();
  public headerTitle = input.required<string>();
  public hiddeTitle = input<boolean>(false);
  public btnFiltrar = input<boolean>(false);
  public labels = input.required<string[]>();
  public data = input.required<FinancialData>();
  public years = input.required<number[]>();
  private chart: Chart | null = null;
  private _chartBgColor: string[] = ['#B9ABEB', '#7459D9'];

  constructor() {
    effect(() => {
      if (this.data() && this.chartCanvas) {
        this.renderChart();
      }
    });
  }

  ngOnInit() {
    Chart.register(...registerables);
  }
  
  ngOnDestroy() {
    if (this.chart) {
      this.chart.destroy();
    }
  }

  onYearChange(event: Event) {
    const selectedYear = parseInt((event.target as HTMLSelectElement).value, 10);
    this.yearSelected.emit(selectedYear);
  }
  
  renderChart() {
    const { data1, data2 } = this.data() || { ingreso: 0, egreso: 0 };
    const ctx = this.chartCanvas.nativeElement.getContext('2d');
    const gradient2 = ctx!.createLinearGradient(0, 0, 0, 100);
    gradient2.addColorStop(0, "rgba(4, 100, 243, .6)");
    gradient2.addColorStop(1, "rgba(129, 85, 254, 1)");

    if(ctx){
      new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: this.labels(),
          datasets: [{
            label: '',
            data: [data2, data1],
            borderWidth: 2,
            borderRadius: 20,
            backgroundColor: this._chartBgColor,
            hoverOffset: 5
          }]
          
        },
        options: {
          responsive: true,
          cutout: 115,
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              backgroundColor: gradient2,
              titleColor: "#f2f2f2",
              titleFont: {
                size: 12,
                weight: "normal",
              },
              bodyColor: "#FFFFFF",
              bodyFont: {
                size: 16,
                weight: "bold",
                family: "Poppins",
              },
              cornerRadius: 10,
              padding: {
                x: 20,
                y: 10,
              },
              borderWidth: 2,
              borderColor: "rgba(4, 33, 285, .15",
            },
          }
        },
      });

    }
  }

}
