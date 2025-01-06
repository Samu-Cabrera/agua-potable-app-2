import { Component, input } from '@angular/core';
import { FacturaElement } from '../../Interfaces/factura.interface';
import { DatePipe, DecimalPipe, TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-factura',
  standalone: true,
  imports: [
    DecimalPipe,
    TitleCasePipe,
    DatePipe
  ],
  templateUrl: './factura.component.html',
  styleUrl: './factura.component.scss'
})
export class FacturaComponent {
  public factura = input.required<FacturaElement>();
    public facturasPendientes = input.required<FacturaElement[]>();
  
    cuentaTotal(): number {
      const cuentaPendiente = this.facturasPendientes().reduce((sum, factura) => sum + factura.cuentaTotal, 0);
      const cuentaTotal = this.factura().cuentaTotal;
      return cuentaPendiente + cuentaTotal;
    }
}
