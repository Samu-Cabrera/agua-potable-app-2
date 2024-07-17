import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { RouterLink, RouterModule } from '@angular/router';
import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { UserItemComponent } from '../../components/user-item/user-item.component';
import { SearchInputComponent } from '../../components/search-input/search-input.component';
import { Usuario } from '../../interfaces/user.interface';
import { TitleCasePipe } from '@angular/common';
import { PhotoPipe } from '../../pipes/photo.pipe';

@Component({
  selector: 'medidor-user-list',
  standalone: true,
  imports: [
    RouterModule,
    UserItemComponent,
    SearchInputComponent,
    DragDropModule,
    TitleCasePipe,
    PhotoPipe
  ],
  templateUrl: './medidor-user-list.component.html',
  styleUrl: './medidor-user-list.component.scss'
})
export class MedidorUserListComponent implements OnInit{

  private readonly _userService = inject(UserService);
  public users: Usuario[] = [];
  public usersFound: Usuario[] = [];

  ngOnInit(): void {

    const saveUser = localStorage.getItem('users');
    this.users = saveUser ? JSON.parse(saveUser) : [];

    this._userService.getUser().subscribe(res => {
      if (!saveUser) {
        this.users = res.usuarios;
        localStorage.setItem('users', JSON.stringify(this.users));
      }
    });
  }

  drop(event: CdkDragDrop<Usuario[]>) {
    moveItemInArray(this.users, event.previousIndex, event.currentIndex);
    localStorage.setItem('users', JSON.stringify(this.users));
  }

  onUsersFound(user: Usuario[]): void {
    this.users = user;
    console.log(this.usersFound)
  }

}
