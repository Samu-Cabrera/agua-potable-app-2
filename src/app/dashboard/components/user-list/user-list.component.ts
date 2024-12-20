import { Component, inject, OnInit, output } from '@angular/core';
import { UserList } from '../../interfaces/user-list.interface';
import { TitleCasePipe } from '@angular/common';
import { UsuariosService } from '../../services/usuarios.service';
import { map } from 'rxjs';

@Component({
  selector: 'user-list',
  standalone: true,
  imports: [
    TitleCasePipe,
    
  ],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent implements OnInit {
  private readonly _userService = inject(UsuariosService);
  public userClicked = output<any>();
  public userList: UserList[] = [];

  ngOnInit(): void {
    this.loadUsuarios();
  }

  loadUsuarios(): void {
    this._userService.getUsuarios().pipe(
      map(usuarios => usuarios.usuarios)
    ).subscribe(user => {
      this.userList = user.map(user => ({
        id: user._id,
        name: `${user.nombre} ${user.apellido}`,
        address: user.direccion,
        message: 'Nuevo message',
        avatar: user.imagen
      }));
    })
  }

  onClick(id: string): void {
    this.userClicked.emit({
      userId: id,
      selected: true
    });
  }

}
