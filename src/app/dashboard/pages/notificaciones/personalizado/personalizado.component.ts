import { Component } from '@angular/core';
import { InputForm } from '../../../interfaces/input-form.interfaces';
import { AvisoFormComponent } from '../../../components/aviso-form/aviso-form.component';

@Component({
  selector: 'app-personalizado',
  standalone: true,
  imports: [
    AvisoFormComponent
  ],
  templateUrl: './personalizado.component.html',
  styleUrl: './personalizado.component.scss'
})
export class PersonalizadoComponent {
  public input: InputForm[] = [
    {
      title: 'Título',
      typeInput: 'text',
      
    },
    {
      title: 'Descripción',
      typeInput: 'text'
    },
    {
      title: 'Fecha',
      typeInput: 'date',
      class: 'fecha'
    },
    {
      title: 'Fecha',
      typeInput: 'time',
      class: 'hora'
    },

  ];
}
