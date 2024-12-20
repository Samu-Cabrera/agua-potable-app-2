import { TitleCasePipe } from '@angular/common';
import { Component, input, ViewChild, ElementRef, OnInit, inject, effect } from '@angular/core';
import { Chart, registerables } from "chart.js";

@Component({
  selector: 'bar-chart',
  standalone: true,
  imports: [
    TitleCasePipe
  ],
  templateUrl: './bar-chart.component.html',
  styleUrl: './bar-chart.component.scss'
})
export class BarChartComponent implements OnInit {
  @ViewChild("barchart") chartCanvas!: ElementRef<HTMLCanvasElement>;
  public btnFiltrar = input<boolean>(true);
  public headerTitle = input<string>('Chart title');
  public labelData = input.required<string[]>();
  public data = input.required<number[]>();
  public years = input.required<number[]>();
  private chart!: Chart;

  constructor() {
    effect(() => {
      if (this.chart) {
        this.updateChartData();
      }
    });
  }
  ngOnInit(): void {
    Chart.register(...registerables);
  }

  ngAfterViewInit() {
    this.renderChart();
  }

  renderChart(): void {
    const ctx = this.chartCanvas.nativeElement.getContext('2d');
    //color de la linea
    const gradient = ctx!.createLinearGradient(0, 0, 0, 300);
    gradient.addColorStop(1, "rgba(4, 100, 243, .75)"); // Azul
    gradient.addColorStop(0, "rgba(255, 0, 255, 1)"); //magenta
    const gradient2 = ctx!.createLinearGradient(0, 0, 0, 300);
    gradient2.addColorStop(0, "rgba(129, 85, 254, .8)"); // purpura
    gradient2.addColorStop(1, "rgba(4, 10, 243, .8)"); //azul
    const gradient3 = ctx!.createLinearGradient(0, 0, 0, 300);
    gradient3.addColorStop(0, "rgba(129, 85, 254, .6)"); // purpura
    gradient3.addColorStop(1, "rgba(129, 85, 254, .9)"); //purpura claro
    const gradient4 = ctx!.createLinearGradient(0, 0, 0, 300);
    gradient4.addColorStop(0, "rgba(253, 16, 215, 1)"); // azul claro
    gradient4.addColorStop(1, "rgba(4, 100, 243, 1)"); //azul

    if(ctx){
      this.chart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: this.labelData(),
          datasets: [{
            data: this.data(),
            backgroundColor: [gradient, gradient2, gradient3, gradient4],
            borderRadius: 20,
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              display: false,
              
            },
            tooltip: {
              backgroundColor: gradient,
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
            }
          },
          scales: {
            x: {
              ticks: {
                color: '#979696',
                font: {
                  family: 'Poppins',
                  size: 12,
                  weight: 300
                }
              },
              grid: {
                color: 'transparent',
              }
            },
            y: {
              ticks: {
                color: '#979696',
                font: {
                  family: 'Poppins',
                  size: 12,
                  weight: 300
                }
              },
              grid: {
                color: 'transparent',
              }
            }
          }
        },
      });
    }
  }

  updateChartData(): void {
    if (this.chart && this.data()) {
      this.chart.data.labels = this.labelData();
      this.chart.data.datasets[0].data = this.data();
      this.chart.update();
    }
  }
}
