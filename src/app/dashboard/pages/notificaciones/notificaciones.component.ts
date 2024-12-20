import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { MenuSuperiorComponent } from '../../shared/menu-superior/menu-superior.component';
import { UserListComponent } from "../../components/user-list/user-list.component";
import { MessageComponent } from '../../components/message/message.component';
import { RouterLink } from '@angular/router';
import { AvisoService } from '../../services/aviso.service';

interface Aviso {
  _id: string;
  mensaje: string;
  usuario: Usuario;
  respuestas: Respuesta[];
  createdAt: Date;
  updatedAt: Date;
  leido: boolean;
}

interface Respuesta {
  mensaje: string;
  usuario: Usuario;
  _id: string;
  createdAt: Date;
  updatedAt: Date;
}

interface Usuario {
  _id: string;
  nombre: string;
  apellido: string;
  direccion: string;
  imagen: string;
}

interface Message {
  id: string;
  user: {
    id: string;
    name: string;
    lastname: string;
    address: string;
    imagen: string;
  };
  message: string;
  date: Date;
}

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
export class NotificacionesComponent implements OnInit {
  private readonly _avisoService = inject(AvisoService);
  private readonly _cdr = inject(ChangeDetectorRef);
  public user: any | null;
  public messages: Message[] = [];

  ngOnInit(): void {
    // Initialization if needed
  }

  onClickValue(value: any): void {
    const { userId } = value;
    this.getAvisoByUserId(userId);
  }

  getAvisoByUserId(userId: string): void {
    this._avisoService.getAvisoById(userId).subscribe((avisos) => {
      // Actualizar mensajes y usuario seleccionado
      if (avisos.length > 0) {
        this.setUser(avisos[0].usuario);
        this.setAvisos(avisos);
      } else {
        this.setUser(null!);
        this.setAvisos([]);
      }
    });
  }

  setUser(user: Usuario | null): void {
    this.user = user
      ? {
          id: user._id,
          name: user.nombre,
          lastname: user.apellido,
          address: user.direccion,
          imagen: user.imagen
        }
      : null;
  }

  setAvisos(avisos: Aviso[]): void {
    this.messages = avisos.map((aviso) => ({
      id: aviso._id,
      user: {
        id: aviso.usuario._id,
        name: aviso.usuario.nombre,
        lastname: aviso.usuario.apellido,
        address: aviso.usuario.direccion,
        imagen: aviso.usuario.imagen
      },
      message: aviso.mensaje,
      date: aviso.createdAt
    }));
    this._cdr.markForCheck();
  }
}

