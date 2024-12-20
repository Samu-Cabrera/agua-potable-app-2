import { Component, inject, OnInit } from '@angular/core';
import { FacturasService } from '../../../services/facturas.service';
import { ActivatedRoute } from '@angular/router';
import { SharedFacturaComponent } from '../../../shared/shared-factura/shared-factura.component';
import { switchMap, filter, map } from 'rxjs';
import { Factura } from '../../../interfaces/facturas.interfaces';

@Component({
  selector: 'app-detalle-factura',
  standalone: true,
  imports: [
    SharedFacturaComponent
  ],
  templateUrl: './detalle-factura.component.html',
  styleUrl: './detalle-factura.component.scss'
})
export class DetalleFacturaComponent implements OnInit {
  private readonly _facturaService = inject(FacturasService);
  private readonly _activatedRoute = inject(ActivatedRoute);
  public factura!: any;
  public facturasPendientes!: any[];
  ngOnInit(): void {
    this.loadFactura()
  }

  loadFactura(): void {
   this._activatedRoute.params.pipe(
      switchMap(({ id }) => this._facturaService.facturaById(id))
   ).subscribe(res => {
    this.factura = res;
    this.loadFacturasPendientes(res.userID._id);
   });
  }

  loadFacturasPendientes(id: string): void {
    this._facturaService.getFacturasById(id).pipe(
      map(facturas => facturas.factura),
      map(facturas => facturas.filter(facturas => facturas.estadoPago === false))
    ).subscribe(facturas => {
      this.facturasPendientes = facturas;
      console.log(this.facturasPendientes);
    })
  }
}
