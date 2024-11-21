import { Component } from '@angular/core';
import { MenuSuperiorComponent } from '../../shared/menu-superior/menu-superior.component';
import { UserListComponent } from "../../components/user-list/user-list.component";
import { MessageComponent } from '../../components/message/message.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-notificaciones',
  standalone: true,
  imports: [
    RouterLink,
    MenuSuperiorComponent,
    UserListComponent,
    MessageComponent
],
  templateUrl: './notificaciones.component.html',
  styleUrl: './notificaciones.component.scss'
})
export class NotificacionesComponent {

  onClickValue(value: boolean): void {
    console.log(value);
  }
}
