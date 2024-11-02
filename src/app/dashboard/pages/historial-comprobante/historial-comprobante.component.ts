import { Component } from '@angular/core';
import { CardComponent } from '../../components/card/card.component';
import { Card } from '../../interfaces/card.interface';

@Component({
  selector: 'historial-comprobante',
  standalone: true,
  imports: [
    CardComponent
  ],
  templateUrl: './historial-comprobante.component.html',
  styleUrl: './historial-comprobante.component.scss'
})
export class HistorialComprobanteComponent {
  public data: Card[] = [
    {
      title: 'Enero 2023',
      nro: 1,
      consumo: 1000,
      monto: 20000
    },
    {
      title: 'Enero 2023',
      nro: 2,
      consumo: 1000,
      monto: 20000
    },
    {
      title: 'Enero 2023',
      nro: 3,
      consumo: 1000,
      monto: 20000
    },
    {
      title: 'Enero 2023',
      nro: 4,
      consumo: 1000,
      monto: 20000
    }
  ]
}
