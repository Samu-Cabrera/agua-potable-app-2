import { Component, inject, OnInit, signal } from '@angular/core';
import { DatePipe, DecimalPipe } from '@angular/common';
import { MenuSuperiorComponent } from './../../shared/menu-superior/menu-superior.component';
import { LineChartComponent } from '../../components/line-chart/line-chart.component';
import { DoughnutChartComponent } from '../../components/doughnut-chart/doughnut-chart.component';
import { FacturasService } from '../../services/facturas.service';
import { UsuariosService } from '../../services/usuarios.service';
import { TransactionService } from '../../services/transaction.service';
import { ReciboService } from '../../services/recibo.service';
import { Usuarios } from '../../interfaces/usuarios.interface';
import { Recibo } from '../../interfaces/recibo.interface';
import { Factura } from '../../interfaces/facturas.interfaces';
import { Transaction } from '../../interfaces/transaction.interface';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MenuSuperiorComponent,
    LineChartComponent,
    DoughnutChartComponent,
    DecimalPipe,
    DatePipe
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  private readonly _facturaService = inject(FacturasService);
  private readonly _usuarioService = inject(UsuariosService);
  private readonly _reciboService = inject(ReciboService);
  private readonly _transacionesService = inject(TransactionService);
  public yearSelected: number[] = [];
  public facturasFiltradas: Factura[] = [];
  public reciboFiltrados: Recibo[] = [];
  public usuarios: Usuarios | null = null;
  public today: Date = new Date();
  public labelChart: string[] = ['Egreso', 'Ingreso'];
  public financialData!: { data1: number, data2: number };
  public transactions: Transaction[] = [];
  public realDataConsumo: number[] = [1, 3, 4];
  public years: number[] = [2024, 2025];
  public labelDataConsumo: string[] = [
    "Ene",
    "Feb",
    "Mar",
    "Abr",
    "May",
    "Jul",
    "Ago",
    "Sep",
    "Oct",
    "Nov",
    "Dic",
  ];


  ngOnInit(): void {
    this.getFacturas();
    this.getRecibo();
    this.getUsuarios();
    this.getTransacciones();
  }

  getFacturas(): void {
    this._facturaService.getFacturas().subscribe((facturas: any[]) => {
        const mesActual = new Date().getMonth();
        const yearActual = new Date().getFullYear();
        const consumoAgua = facturas.map(factura => factura.consumo.cantidad);
        this.realDataConsumo = consumoAgua;
        
        this.facturasFiltradas = facturas.filter(factura => {
          const fechaEmision = new Date(factura.fechaEmision);
          return fechaEmision.getMonth() === mesActual && fechaEmision.getFullYear() === yearActual;
        });

        
      }
    );
  };

  getRecibo(): void {
    this._reciboService.getRecibos().subscribe((recibo: Recibo[]) => {
        const mesActual = new Date().getMonth();
        const yearActual = new Date().getFullYear();
        
        this.reciboFiltrados = recibo.filter(recibo => {
          const fechaEmision = new Date(recibo.fechaEmision);
          return fechaEmision.getMonth() === mesActual && fechaEmision.getFullYear() === yearActual;
        });
      }
    );
  };

  getUsuarios(): void {
    this._usuarioService.getUsuarios().subscribe((data: Usuarios) => {
      this.usuarios = data;
    });
  }

  updateFinancialData(year: number): void {
    const filteredTransactions = this.transactions.filter(
      transaction => new Date(transaction.date).getFullYear() === year
    );
    this.financialData = {
      data1: this.ingresoEgreso(filteredTransactions).ingreso,
      data2: this.ingresoEgreso(filteredTransactions).egreso,
    };
  }

  ingresoEgreso(data: Transaction[]): any {
    return data.reduce(
      (acc, transaction) => {
        if (transaction.type === 'ingreso') {
          acc.ingreso += transaction.amount;
        } else if (transaction.type === 'egreso') {
          acc.egreso += transaction.amount;
        }
        return acc;
      },
      { ingreso: 0, egreso: 0 }
    );
  }

  getTransacciones(): void {
    this._transacionesService.getTransactions().subscribe(transacciones => {
      this.financialData = {data1: this.ingresoEgreso(transacciones).ingreso, data2: this.ingresoEgreso(transacciones).egreso };
      const uniqueYears = Array.from(new Set(transacciones.map(transaction => {
        const date = new Date(transaction.date);
        return date.getFullYear();
      })));
      this.yearSelected = uniqueYears.sort((a, b) => a - b);
    });
  }

  filtrarPorAnioActual<T extends { fechaEmision: string }>(items: T[]): T[] {
    const yearActual = new Date().getFullYear();
    return items.filter(item => new Date(item.fechaEmision).getFullYear() === yearActual);
  }

  onYearSelected(year: number): void {
    this.updateFinancialData(year);
  }
}
