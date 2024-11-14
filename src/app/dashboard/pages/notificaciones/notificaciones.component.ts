import { Component } from '@angular/core';
import { MenuSuperiorComponent } from '../../shared/menu-superior/menu-superior.component';

@Component({
  selector: 'app-notificaciones',
  standalone: true,
  imports: [
    MenuSuperiorComponent
  ],
  templateUrl: './notificaciones.component.html',
  styleUrl: './notificaciones.component.scss'
})
export class NotificacionesComponent {

}
