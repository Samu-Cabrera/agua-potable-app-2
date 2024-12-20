import { Component, inject, OnInit } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { ReciboService } from '../../../services/recibo.service';
import { FacturasService } from '../../../services/facturas.service';
import { DoughnutChartComponent } from '../../../components/doughnut-chart/doughnut-chart.component';
import { BarChartComponent } from '../../../components/bar-chart/bar-chart.component';
import { map } from 'rxjs';

@Component({
  selector: 'app-finanza',
  standalone: true,
  imports: [
    DoughnutChartComponent,
    BarChartComponent,
    DecimalPipe
  ],
  templateUrl: './finanza.component.html',
  styleUrl: './finanza.component.scss'
})
export class FinanzaComponent implements OnInit {
  private readonly _reciboService = inject(ReciboService);
  private readonly _facturasService = inject(FacturasService);
  //DoughnutChart
  public labels: string[] = ['Egreso', 'Ingreso'];
  public years: number[] = [2024, 2023, 2022];
  public data!: { data1: number, data2: number };
  //barchart
  public labelData!: string[];
  public barChartData!: number[];
  
  

  ngOnInit(): void {
    this.getImporteUser();
    // this.getFacturas();
    this.getFacturasPorMes();
  }

  getImporteUser() {
    this._reciboService.getRecibos().subscribe(res => {
      const data = res.map(recibo => recibo.importe);
      const ingresoTotal = data.reduce((acc, recibo) => acc + recibo, 0);
      this.data = { data1: ingresoTotal, data2: 0 };
    });
  }
  getFacturasPorMes(): void {
    this._facturasService.getFacturas().pipe(
      map((facturas: any[]) => {
        // Agrupar y sumar las cuentas por mes
        const deudasPorMes = facturas.reduce((acumulador, factura) => {
          const mes = new Date(factura.fechaEmision).getMonth();
          acumulador[mes] = (acumulador[mes] || 0) + factura.cuentaTotal;
          return acumulador;
        }, {});
  
        // Formatear los datos para el gráfico
        const datosGrafico = Array.from({ length: 12 }, (_, index) => ({
          mes: new Date(0, index).toLocaleString('es', { month: 'long' }),
          total: deudasPorMes[index] || 0
        }));
  
        return datosGrafico;
      })
    ).subscribe(datosGrafico => {
      this.labelData = datosGrafico.map(dato => dato.mes);
      this.barChartData = datosGrafico.map(dato => dato.total);
    });
  }
}
