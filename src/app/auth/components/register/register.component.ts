import { NgClass, TitleCasePipe } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    NgClass,
    TitleCasePipe
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
 

  selectIndex: number = 0;
  selectItem: number = 0;
  opcionValue: string = 'Medidor';
  btnShow: boolean = false;

  onNextCard(): void {
    this.selectIndex++;

  }

  onPrevCard(): void {
    this.selectIndex--;
  }

  onClickItem1(): void {
    this.selectItem = 0;
    this.opcionValue = 'Analógico';
    this.btnShow = false;

  }

  onClickItem2(): void {
    this.selectItem = 1;
    this.opcionValue = 'Digital';
    this.btnShow = false;

  }

  showBtn(): void {
    this.btnShow = true;
  }

  hideBtn(): void {
    this.btnShow = false;
  }
}
