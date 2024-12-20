import { Component } from '@angular/core';
import { InputForm } from '../../../interfaces/input-form.interfaces';
import { AvisoFormComponent } from '../../../components/aviso-form/aviso-form.component';

@Component({
  selector: 'app-corte',
  standalone: true,
  imports: [
    AvisoFormComponent
  ],
  templateUrl: './corte.component.html',
  styleUrl: './corte.component.scss'
})
export class CorteComponent {
  /* public input: InputForm[] = [
    {
      title: 'Título',
      typeInput: 'text',
      
    },
    {
      title: 'Motivo',
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
    {
      title: 'Descripción',
      typeInput: 'text'
    }
  ]; */
}
