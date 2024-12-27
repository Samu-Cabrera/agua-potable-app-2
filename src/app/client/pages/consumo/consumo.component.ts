import { Component } from '@angular/core';
import { CircleProgressComponent } from '../../../shared/circle-progress/circle-progress.component';

@Component({
  selector: 'app-consumo',
  standalone: true,
  imports: [
    CircleProgressComponent
  ],
  templateUrl: './consumo.component.html',
  styleUrl: './consumo.component.scss'
})
export class ConsumoComponent {

  public value: number = 5000;
  public maxValue: number = 10000;
  public diaConsumo: number = 3;
  /**value
  maxValue
  diaConsumo */

}
