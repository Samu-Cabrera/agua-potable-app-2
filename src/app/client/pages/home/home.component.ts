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
    { title: 'historial', icon: 'ri-file-list-line', link: `/client/historial/${ this.userId }/facturas` },
    { title: 'avisos', icon: 'ri-notification-2-line', link: `/client/avisos/${ this.userId }` },
    { title: 'calculadora', icon: 'ri-calculator-line', link: `/client/calculator/${ this.userId }` },
    { title: 'peglamentos', icon: 'ri-auction-line', link: '/client/reglamentos' },
    { title: 'perfil', icon: 'ri-user-settings-line', link: `/client/perfil/${ this.userId }` },
  ];

  //obtener el id del usuario desde el localstorage una vez que se inicia sesion.
  get userId(): string {
    const userId = '6769ae2135609290e4cfdca1';
    return userId;
  }

  


}
