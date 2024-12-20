import { ActivatedRoute } from '@angular/router';
import { ReciboService } from '../../../services/recibo.service';
import { SharedComprobanteComponent } from './../../../shared/shared-comprobante/shared-comprobante.component';
import { Component, inject, OnInit } from '@angular/core';
import { Recibo } from '../../../interfaces/recibo.interface';
import { forkJoin, map, of, switchMap } from 'rxjs';

@Component({
  selector: 'app-detalle-comprobante',
  standalone: true,
  imports: [
    SharedComprobanteComponent
  ],
  templateUrl: './detalle-comprobante.component.html',
  styleUrl: './detalle-comprobante.component.scss'
})
export class DetalleComprobanteComponent implements OnInit {
  private readonly _reciboService = inject(ReciboService);
  private readonly _activatedRoute = inject(ActivatedRoute);
  private _recibo!: Recibo;

  public comprobante!: any;
  ngOnInit(): void {
    this.loadRecibo();
  }

  loadRecibo(): void {
    const reciboId = this._activatedRoute.snapshot.paramMap.get('id');
    this._reciboService.getRecibos().pipe(
      map(recibos => recibos.find(recibo => recibo._id === reciboId))
    ).subscribe(res => {
      this.setComprobante(res);
    })
  }

  setComprobante(data: any) {
    this.comprobante = {
      nroRecibo: data.nroRecibo,
      username: `${data.userID.nombre} ${data.userID.apellido}`,
      ci: data.userID.ci,
      userAdress: data.userID.direccion,
      factura: data.facturas, // Si la estructura de las facturas ya coincide con la interfaz Factura
      servicio: data.servicio,
      formaPago: data.formaPago,
      tesorero: data.tesorero,
      importe: data.importe,
      fecha: data.fechaEmision,
      totalCuenta: data.total,
    };

    console.log(this.comprobante);
  }
}
