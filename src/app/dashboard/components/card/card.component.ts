import { Component, input } from '@angular/core';
import { Card } from '../../interfaces/card.interface';
import { DecimalPipe, TitleCasePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'card-component',
  standalone: true,
  imports: [
    RouterLink,
    TitleCasePipe,
    DecimalPipe,
  ],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  public cardData = input.required<Card>();
}
