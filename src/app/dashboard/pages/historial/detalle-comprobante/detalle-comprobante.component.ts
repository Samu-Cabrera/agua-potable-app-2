import { SharedComprobanteComponent } from './../../../shared/shared-comprobante/shared-comprobante.component';
import { Component } from '@angular/core';

@Component({
  selector: 'app-detalle-comprobante',
  standalone: true,
  imports: [
    SharedComprobanteComponent
  ],
  templateUrl: './detalle-comprobante.component.html',
  styleUrl: './detalle-comprobante.component.scss'
})
export class DetalleComprobanteComponent {

}
