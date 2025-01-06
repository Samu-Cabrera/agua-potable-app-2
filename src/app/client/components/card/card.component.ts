import { DatePipe, DecimalPipe, TitleCasePipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { Card } from '../../Interfaces/card.interface';

@Component({
  selector: 'card',
  standalone: true,
  imports: [
    DecimalPipe,
    TitleCasePipe,
    DatePipe
  ],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  public cardData = input.required<Card>();
}
