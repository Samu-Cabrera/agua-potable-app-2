import { Component, input } from '@angular/core';
import { InputForm } from '../../interfaces/input-form.interfaces';
import { NgClass } from '@angular/common';

@Component({
  selector: 'aviso-form',
  standalone: true,
  imports: [
    NgClass
  ],
  templateUrl: './aviso-form.component.html',
  styleUrl: './aviso-form.component.scss'
})
export class AvisoFormComponent {
  public titleForm = input.required<string>();
  public inputItem = input<InputForm[]>();
}
