import { TitleCasePipe } from '@angular/common';
import { Component } from '@angular/core';
import { ModalComponent } from '../../../shared/modal/modal.component';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [
    TitleCasePipe,
    ModalComponent
  ],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.scss'
})
export class PerfilComponent {
  public modal = false;

  public inputs: any[] = [
    {
      label: 'Nombre',
      labelFor: 'name',
      inputType: 'text',
      inputId: 'name',
    },
    {
      label: 'Apellido',
      labelFor: 'lastname',
      inputType: 'text',
      inputId: 'lastname',
    },
    {
      label: 'Email',
      labelFor: 'email',
      inputType: 'email',
      inputId: 'email',
    },
    {
      label: 'dirección',
      labelFor: 'address',
      inputType: 'text',
      inputId: 'address',
    },
    {
      label: 'Teléfono',
      labelFor: 'phone',
      inputType: 'cel',
      inputId: 'phone',
    }
  ];

  closeModal(event: any){
    this.modal = false;
    console.log(event);
  }

  subirPhoto(){
    this.modal = true;
  }

}
