import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { UserItemComponent } from '../../components/user-item/user-item.component';
import { SearchInputComponent } from '../../components/search-input/search-input.component';
import { Usuario } from '../../interfaces/user.interface';
import { TitleCasePipe } from '@angular/common';
import { PhotoPipe } from '../../pipes/photo.pipe';

@Component({
  selector: 'medidor-user-list',
  standalone: true,
  imports: [
    UserItemComponent,
    SearchInputComponent,
    TitleCasePipe,
    PhotoPipe
  ],
  templateUrl: './medidor-user-list.component.html',
  styleUrl: './medidor-user-list.component.scss'
})
export class MedidorUserListComponent implements OnInit{

  private readonly _userService = inject(UserService);
  public users: Usuario[] = [];

  ngOnInit(): void {
    this._userService.getUser().subscribe(res => {
      this.users = res.usuarios;
      console.log(this.users);
    });
  }

}
