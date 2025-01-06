import { Component, input } from '@angular/core';
import { Recibo } from '../../Interfaces/recibo.interface';
import { DatePipe, DecimalPipe, TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-recibo',
  standalone: true,
  imports: [
    TitleCasePipe,
    DecimalPipe,
    DatePipe
  ],
  templateUrl: './recibo.component.html',
  styleUrl: './recibo.component.scss'
})
export class ReciboComponent {
  public comprobante = input.required<Recibo>();
}
