import { Component, inject, OnInit } from '@angular/core';
import { CardComponent } from '../../../components/card/card.component';
import { Card } from '../../../interfaces/card.interface';
import { ActivatedRoute } from '@angular/router';
import { FacturasService } from '../../../services/facturas.service';

@Component({
  selector: 'app-factura',
  standalone: true,
  imports: [
    CardComponent
  ],
  templateUrl: './factura.component.html',
  styleUrl: './factura.component.scss'
})
export class FacturaComponent implements OnInit{
  private readonly _activatedRoute = inject(ActivatedRoute);
  private readonly _facturaService = inject(FacturasService);
  private _facturas!: any;

  public data: Card[] = [];
  

  ngOnInit(): void {
    this._activatedRoute.parent?.paramMap.subscribe(paramMap => {
      const userId = paramMap.get('userId'); 
      this.loadFactura(userId!);
    });
  }

  loadFactura(userId: string): void {
    this._facturaService.getFacturasById(userId).subscribe(facturas => {
      this._facturas = facturas;
      this.loadDataCard(this._facturas.factura);
    });
  }

  loadDataCard(factura: any[]): void {
    this.data = factura.map(fact => {
      return {
        id: fact._id,
        userId: fact.userID._id,
        title: `Factura Nro. ${fact.nroFactura}`,
        fecha: fact.fechaEmision,
        nro: fact.nroFactura,
        consumo: fact.consumo.cantidad,
        monto: fact.cuentaTotal,
        urlTitle: 'facturas'
      }
    })
  }
}
