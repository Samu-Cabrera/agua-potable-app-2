import { Component, inject, OnInit } from '@angular/core';
import { DecimalPipe, TitleCasePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { CircleProgressComponent } from '../../../shared/circle-progress/circle-progress.component';
import { ConsumoService } from '../../services/consumo.service';
import { Consumo } from '../../Interfaces/consumo.interface';
import { FacturaService } from '../../services/factura.service';
import { FacturaElement } from '../../Interfaces/factura.interface';
import { ModalComponent } from '../../../shared/modal/modal.component';
import { FacturaComponent } from '../../components/factura/factura.component';

@Component({
  selector: 'app-consumo',
  standalone: true,
  imports: [
    CircleProgressComponent,
    ModalComponent,
    FacturaComponent,
    DecimalPipe,
    TitleCasePipe
  ],
  templateUrl: './consumo.component.html',
  styleUrl: './consumo.component.scss'
})
export class ConsumoComponent implements OnInit {
  private readonly _activatedRoute = inject(ActivatedRoute);
  private readonly _consumoService = inject(ConsumoService);
  private readonly _facturaService = inject(FacturaService);
  public value!: number;
  public maxValue!: number;
  public diaConsumo!: number;
  public cuenta!: number;
  public factura!: FacturaElement;
  public facturaPendientes!: any;
  public modal: boolean = false;

  ngOnInit(): void {
    this.loadConsumoData();
  }

  loadConsumoData(): void {
    this._activatedRoute.params.pipe(
      switchMap(({ id }) => this._consumoService.getConsumoActual(id))
    ).subscribe((data: Consumo) => {
      this.value = data.consumoActual;
      this.maxValue = data.ultimaLectura.limite;
      this.diaConsumo = data.diferenciaEnDias;
      this.loadFactura(data.ultimaLectura.userID);
    })
  }

  loadFactura(id: string) {
    this._facturaService.getFacturaByUserId(id).subscribe(({ factura }) => {
      this.cuenta = factura[factura.length - 1].cuentaTotal;
      this.factura = factura[factura.length - 1];
      this.facturaPendientes = factura.filter(fac => fac.estadoPago === false);
    });
  }

  openModal(): void {
    this.modal = true;
  }

  closeModal(event: any): void {
    this.modal = false;
  }

}
