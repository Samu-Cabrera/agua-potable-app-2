import { Component, input } from '@angular/core';
import { Factura } from '../../interfaces/facturas.interfaces';
import { DatePipe, DecimalPipe, TitleCasePipe } from '@angular/common';

@Component({
  selector: 'shared-factura',
  standalone: true,
  imports: [
    TitleCasePipe,
    DatePipe,
    DecimalPipe
  ],
  templateUrl: './shared-factura.component.html',
  styleUrl: './shared-factura.component.scss'
})
export class SharedFacturaComponent {
  public factura = input.required<Factura>();
  public facturasPendientes = input.required<Factura[]>();

  cuentaTotal(): number {
    const cuentaPendiente = this.facturasPendientes().reduce((sum, factura) => sum + factura.cuentaTotal, 0);
    const cuentaTotal = this.factura().cuentaTotal;
    return cuentaPendiente + cuentaTotal;
  }
}
