import { Component, inject, OnInit } from '@angular/core';
import { CardComponent } from '../../../components/card/card.component';
import { ActivatedRoute } from '@angular/router';
import { ReciboService } from '../../../services/recibo.service';
import { Card } from '../../../interfaces/card.interface';

@Component({
  selector: 'historial-comprobante',
  standalone: true,
  imports: [
    CardComponent
  ],
  templateUrl: './comprobante.component.html',
  styleUrl: './comprobante.component.scss'
})
export class ComprobanteComponent implements OnInit {
  private readonly _activatedRoute = inject(ActivatedRoute);
  private readonly _reciboService = inject(ReciboService);

  public data: Card[] = [];

  ngOnInit(): void {
    this._activatedRoute.parent?.paramMap.subscribe(paramMap => {
      const userId = paramMap.get('userId'); 
      this.loadRecibo(userId!);
    });

  }

  loadRecibo(userId: string): void {
    this._reciboService.getRecibosById(userId).subscribe(recibos => {
      this.data = recibos.flatMap((recibo: any) => 
        recibo.facturas.map((factura: any) => ({
          id: recibo._id,
          userId: recibo.userID._id,
          title: `Recibo Nro. ${factura.nroFactura}`,
          fecha: recibo.fechaEmision,
          nro: factura.nroFactura,
          consumo: factura.consumo.cantidad,
          monto: factura.cuentaTotal,
          urlTitle: 'comprobantes'
        }))
      );
    });
  }  
}
