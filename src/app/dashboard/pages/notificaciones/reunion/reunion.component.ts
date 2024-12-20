import { Component, inject } from '@angular/core';
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
  public inputs: InputForm[] = [
    {
      name: 'title',
      label: 'Título',
      type: 'text',
      required: true,
      errorMessage: 'Este campo es obligatorio'
    },
    {
      name: 'motivo', 
      label: 'Motivo',
      type: 'text',
      required: true,
      errorMessage: 'Este campo es obligatorio'
    },
    {
      name: 'fecha', 
      label: 'Fecha',
      type: 'date',
      required: true,
      class: 'fecha',
      errorMessage: 'Este campo es obligatorio'

    },
    {
      name: 'fecha', 
      label: 'Fecha',
      type: 'time',
      required: true,
      class: 'hora',
      errorMessage: 'Este campo es obligatorio'
    },
    {
      name: 'address', 
      label: 'Dirección',
      type: 'text',
      required: true,
      errorMessage: 'Este campo es obligatorio'
    },
    {
      name: 'description',  
      label: 'Descripción',
      type: 'text',
      required: true,
      errorMessage: 'Este campo es obligatorio'
    }
  ];

  
  onSubmit(value: any): void {
    console.log(value);
  }
}
