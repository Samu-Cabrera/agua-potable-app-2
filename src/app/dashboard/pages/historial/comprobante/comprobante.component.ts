import { Component } from '@angular/core';
import { CardComponent } from '../../../components/card/card.component';
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
export class ComprobanteComponent {
  public data: Card[] = [
    {
      id: '1',
      userId: '2',
      title: 'Enero 2023',
      nro: 1,
      consumo: 1000,
      monto: 20000,
      urlTitle: 'comprobantes'
    },
    {
      id: '2',
      userId: '2',
      title: 'Enero 2023',
      nro: 2,
      consumo: 2000,
      monto: 30000,
      urlTitle: 'comprobantes'
    }
  ];
}
