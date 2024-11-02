import { Component, input } from '@angular/core';
import { Card } from '../../interfaces/card.interface';
import { DecimalPipe, TitleCasePipe } from '@angular/common';

@Component({
  selector: 'card-component',
  standalone: true,
  imports: [
    TitleCasePipe,
    DecimalPipe
  ],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  public cardData = input.required<Card>();
}
