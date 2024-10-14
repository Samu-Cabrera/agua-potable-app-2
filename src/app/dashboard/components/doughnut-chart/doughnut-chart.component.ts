import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Chart, registerables } from "chart.js";


@Component({
  selector: 'doughnut-chart',
  standalone: true,
  imports: [],
  templateUrl: './doughnut-chart.component.html',
  styleUrl: './doughnut-chart.component.scss'
})
export class DoughnutChartComponent implements OnInit {

  @ViewChild("doughnutChart") chartCanvas!: ElementRef<HTMLCanvasElement>;

  private _labels: string[] = ['Red', 'Blue'];
  private _data: number[] = [100, 250];
  private _chartBgColor: string[] = ['#B9ABEB', '#7459D9'];

  ngOnInit() {
    Chart.register(...registerables);
  }

  ngAfterViewInit() {
    this.renderChart();
  }

  renderChart() {
    const ctx = this.chartCanvas.nativeElement.getContext('2d');

    const gradient2 = ctx!.createLinearGradient(0, 0, 0, 100);
    gradient2.addColorStop(0, "rgba(4, 100, 243, .6)");
    gradient2.addColorStop(1, "rgba(129, 85, 254, 1)");

    if(ctx){
      new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: this._labels,
          datasets: [{
            label: 'My dataset',
            data: this._data,
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
