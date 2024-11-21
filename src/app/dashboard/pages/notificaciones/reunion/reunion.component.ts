import { Component } from '@angular/core';
import { AvisoFormComponent } from '../../../components/aviso-form/aviso-form.component';
import { InputForm } from '../../../interfaces/input-form.interfaces';

@Component({
  selector: 'app-reunion',
  standalone: true,
  imports: [
    AvisoFormComponent
  ],
  templateUrl: './reunion.component.html',
  styleUrl: './reunion.component.scss'
})
export class ReunionComponent {
  public input: InputForm[] = [
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
      title: 'Dirección',
      typeInput: 'text'
    },
    {
      title: 'Descripción',
      typeInput: 'text'
    }
  ]
}
