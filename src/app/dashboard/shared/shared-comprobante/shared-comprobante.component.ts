import { DatePipe, DecimalPipe, TitleCasePipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { Factura } from '../../interfaces/facturas.interfaces';

export interface Comprobante {
  nroRecibo: number;
  username: string;
  ci: number;
  userAdress: string;
  factura: Factura[];
  servicio: string;
  formaPago: string;
  tesorero: string;
  importe: number;
  fecha: string;
  totalCuenta: number;
}

@Component({
  selector: 'shared-comprobante',
  standalone: true,
  imports: [
    TitleCasePipe,
    DatePipe,
    DecimalPipe
  ],
  templateUrl: './shared-comprobante.component.html',
  styleUrl: './shared-comprobante.component.scss'
})
export class SharedComprobanteComponent {

  public comprobante = input.required<Comprobante>();
  
}
