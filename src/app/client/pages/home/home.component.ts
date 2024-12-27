import { TitleCasePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    TitleCasePipe,
    RouterModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  public icons: any[] = [
    { title: 'consumo', icon: 'ri-temp-cold-line', link: `/client/consumo/${ this.userId }` },
    { title: 'historial', icon: 'ri-file-list-line', link: '#' },
    { title: 'avisos', icon: 'ri-notification-2-line', link: '#' },
    { title: 'calculadora', icon: 'ri-calculator-line', link: '#' },
    { title: 'peglamentos', icon: 'ri-auction-line', link: '#' },
    { title: 'perfil', icon: 'ri-user-settings-line', link: '#' },
  ];

  //obtener el id del usuario desde el localstorage una vez que se inicia sesion.
  get userId(): string {
    const userId = '1';
    return userId;
  }

  


}
