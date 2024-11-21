import { RouterLink, RouterModule } from '@angular/router';
import { MenuSuperiorComponent } from './../../../shared/menu-superior/menu-superior.component';
import { Component } from '@angular/core';

@Component({
  selector: 'app-crear-notificacion',
  standalone: true,
  imports: [
    MenuSuperiorComponent,
    RouterModule,
    RouterLink
  ],
  templateUrl: './crear-notificacion.component.html',
  styleUrl: './crear-notificacion.component.scss'
})
export class CrearNotificacionComponent {

}
