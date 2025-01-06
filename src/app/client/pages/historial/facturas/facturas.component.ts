import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Card } from '../../../Interfaces/card.interface';
import { CardComponent } from '../../../components/card/card.component';
import { FacturaService } from '../../../services/factura.service';
import { map, switchMap } from 'rxjs';
import {  FacturaElement } from '../../../Interfaces/factura.interface';
import { ModalComponent } from '../../../../shared/modal/modal.component';
import { FacturaComponent } from '../../../components/factura/factura.component';

@Component({
  selector: 'app-facturas',
  standalone: true,
  imports: [
    CardComponent,
    ModalComponent,
    FacturaComponent
  ],
  templateUrl: './facturas.component.html',
  styleUrl: './facturas.component.scss'
})
export class FacturasComponent {
  private route = inject(ActivatedRoute);
  private readonly _facturaService = inject(FacturaService);
  private _factura!: FacturaElement[];
  public facturaDetail!: FacturaElement;
  public facturaPendientes!: FacturaElement[];
  public userId!: string;
  public cardData!: Card[];
  public modal: boolean = false;


  ngOnInit() {
    this.route.parent?.params.pipe(
      switchMap(({ id }) => this._facturaService.getFacturaByUserId(id))
    ).pipe(
      map(facturas => facturas.factura)
    ).subscribe(res => this.loadFactura(res));
  }

  loadFactura(factura: FacturaElement[]): void {
    this._factura = factura;
    this.cardData = factura.map(fac => {
      let estado = 'Pagado';
      if(!fac.estadoPago) estado = 'Pendiente';

      return {
        id: fac._id,
        nro: fac.nroFactura,
        estado: estado,
        total: fac.cuentaTotal,
        fecha: new Date(fac.fechaEmision).toDateString()
      }
    });
    this.facturaPendientes = factura.filter(fac => !fac.estadoPago);
  }

  closeModal(event: any): void {
    this.modal = false;
  }

  openModal(cardId: string, nro: number): void {
    this.modal = true;
    const factura = this._factura.find(f => f._id === cardId && f.nroFactura === nro);
    this.facturaDetail = factura!;
    console.log(this.facturaDetail);
  }
}
