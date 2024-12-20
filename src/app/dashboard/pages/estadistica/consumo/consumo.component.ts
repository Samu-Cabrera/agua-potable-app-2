import { Component, inject, OnInit } from '@angular/core';
import { LineChartComponent } from '../../../components/line-chart/line-chart.component';
import { FacturasService } from '../../../services/facturas.service';

@Component({
  selector: 'app-consumo',
  standalone: true,
  imports: [LineChartComponent],
  templateUrl: './consumo.component.html',
  styleUrl: './consumo.component.scss'
})
export class ConsumoComponent implements OnInit {
  private readonly _facturasService = inject(FacturasService);
  public realData: number[] = new Array(12).fill(0);
  public years: number[] = [new Date().getFullYear()];
  public labelData: string[] = [
    "Ene", "Feb", "Mar", "Abr", "May", "Jun",
    "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"
  ];

  ngOnInit(): void {
    this.getFacturas();
  }

  getFacturas(): void {
    this._facturasService.getFacturas().subscribe((facturas: any[]) => {
      this.procesarDatosConsumo(facturas);
    });
  }

  procesarDatosConsumo(facturas: any[]): void {
    const consumoPorMes = new Array(12).fill(0);

    facturas.forEach(factura => {
      if (factura.consumo && factura.consumo.fecha) {
        const fecha = new Date(factura.consumo.fecha);
        const mes = fecha.getMonth();
        consumoPorMes[mes] += Number(factura.consumo.cantidad) || 0;
      }
    });

    this.realData = consumoPorMes;
    console.log('Datos de consumo por mes:', this.realData);
  }
}