import { Component } from '@angular/core';
import { CardComponent } from '../../../components/card/card.component';
import { Card } from '../../../interfaces/card.interface';

@Component({
  selector: 'app-factura',
  standalone: true,
  imports: [
    CardComponent
  ],
  templateUrl: './factura.component.html',
  styleUrl: './factura.component.scss'
})
export class FacturaComponent {
  public data: Card[] = [
    {
      id: '1',
      userId: '1',
      title: 'Enero 2023',
      nro: 1,
      consumo: 1000,
      monto: 20000,
      urlTitle: 'facturas'
    },
    {
      id: '2',
      userId: '2,',
      title: 'Enero 2023',
      nro: 2,
      consumo: 2000,
      monto: 30000,
      urlTitle: 'facturas'
    },
    {
      id: '3',
      userId: '3',
      title: 'Enero 2023',
      nro: 3,
      consumo: 2000,
      monto: 40000,
      urlTitle: 'facturas'
    }
  ];
}
