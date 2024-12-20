import { TitleCasePipe } from "@angular/common";
import { Component, OnInit, ElementRef, ViewChild, input, SimpleChanges } from "@angular/core";
import { Chart, registerables } from "chart.js";

@Component({
  selector: "line-chart",
  standalone: true,
  imports: [
    TitleCasePipe
  ],
  templateUrl: "./line-chart.component.html",
  styleUrl: "./line-chart.component.scss",
})
export class LineChartComponent implements OnInit {
  @ViewChild("barchart") chartCanvas!: ElementRef<HTMLCanvasElement>;
  public headerTitle = input<string>('Chart title');
  public btnFiltrar = input<boolean>(true);
  public realData = input.required<number[]>();
  public labelData = input.required<string[]>();
  public years = input.required<number[]>();
  public colorData: string[] = [
    "rgba(255, 99, 132, .8)",
    "rgba(255, 159, 64, .8)",
    "rgba(255, 205, 86, .8)",
    "rgba(75, 192, 192, .8)",
  ];
  private chart!: Chart;

  ngOnInit() {
    Chart.register(...registerables);
  }

  ngAfterViewInit() {
    this.renderChart();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['realData'] && !changes['realData'].firstChange) {
      this.updateChart();
    }
  }

  renderChart() {
    const ctx = this.chartCanvas.nativeElement.getContext("2d");

    //color de la linea
    const gradient = ctx!.createLinearGradient(0, 0, 0, 300);
    gradient.addColorStop(1, "rgba(4, 100, 243, .75)"); // Azul
    gradient.addColorStop(0, "rgba(255, 0, 255, 1)"); //magenta

    //color fill
    const gradientFill = ctx!.createLinearGradient(0, 0, 0, 400);
    gradientFill.addColorStop(0, "rgba(116, 89, 217, .2)");
    gradientFill.addColorStop(1, "rgba(255, 255, 255, 0.2)");

    //crea el grafico
    if (ctx) {
      this.chart = new Chart(ctx, {
        type: "line",
        data: {
          labels: this.labelData(),
          datasets: [
            {
              data: this.realData(),
              fill: true,
              borderColor: gradient,
              backgroundColor: gradientFill,
              borderWidth: 3.4,
              pointBorderWidth: 2,
              tension: 0.35,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              display: false,
            },
            title: {
              display: false,
              text: "Consumo 15000 Ls",
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
            },
          },
          scales: {
            x: {
              display: true,
              grid: {
                color: "#fff",
              },
              ticks: {
                color: "#979696",
                font: {
                  family: "Poppins",
                  size: 12,
                },
              },
            },
            y: {
              grid: {
                color: "rgba(237, 239, 255, .88)",
              },
              ticks: {
                color: "#979696",
                font: {
                  family: "Poppins",
                  size: 12,
                },
              },
            },
          },
        },
      });
    }
  }

  updateChart() {
    if (this.chart) {
      this.chart.data.labels = this.labelData();
      this.chart.data.datasets[0].data = this.realData();
      this.chart.update();
    }
  }
}
