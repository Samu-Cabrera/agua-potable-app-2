import { Component, output } from '@angular/core';
import { UserList } from '../../interfaces/user-list.interface';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'user-list',
  standalone: true,
  imports: [
    TitleCasePipe,
    
  ],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent {
  public userClicked = output<any>();

  public userList: UserList[] = [
    {
      name: 'Alex Rodrigues',
      address: 'Coronel Bogado',
      message: 'Nuevo aviso',
      avatar: 'https://res.cloudinary.com/die4hw70e/image/upload/v1728483693/samu-img/user_avatar_sirmyv.jpg'
    },
    {
      name: 'Samu Rodrigues',
      address: 'Coronel Bogado',
      message: 'Nuevo aviso',
      avatar: 'https://res.cloudinary.com/die4hw70e/image/upload/v1728483693/samu-img/user_avatar_sirmyv.jpg'
    },
    {
      name: 'Alexis Rodrigues',
      address: 'San Iisdro, Coronel Bogado',
      message: 'Nuevo aviso',
      avatar: 'https://res.cloudinary.com/die4hw70e/image/upload/v1728483693/samu-img/user_avatar_sirmyv.jpg'
    },
    {
      name: 'Leticia Delvalle',
      address: 'Coronel Bogado',
      message: 'Nuevo aviso',
      avatar: 'https://res.cloudinary.com/die4hw70e/image/upload/v1728483693/samu-img/user_avatar_sirmyv.jpg'
    },
    {
      name: 'Leticia Delvalle',
      address: 'Coronel Bogado',
      message: 'Nuevo aviso',
      avatar: 'https://res.cloudinary.com/die4hw70e/image/upload/v1728483693/samu-img/user_avatar_sirmyv.jpg'
    },
    {
      name: 'Leticia Delvalle',
      address: 'Coronel Bogado',
      message: 'Nuevo aviso',
      avatar: 'https://res.cloudinary.com/die4hw70e/image/upload/v1728483693/samu-img/user_avatar_sirmyv.jpg'
    },
    {
      name: 'Leticia Delvalle',
      address: 'Coronel Bogado',
      message: 'Nuevo aviso',
      avatar: 'https://res.cloudinary.com/die4hw70e/image/upload/v1728483693/samu-img/user_avatar_sirmyv.jpg'
    },
    {
      name: 'Leticia Delvalle',
      address: 'Coronel Bogado',
      message: 'Nuevo aviso',
      avatar: 'https://res.cloudinary.com/die4hw70e/image/upload/v1728483693/samu-img/user_avatar_sirmyv.jpg'
    },
    {
      name: 'Leticia Delvalle',
      address: 'Coronel Bogado',
      message: 'Nuevo aviso',
      avatar: 'https://res.cloudinary.com/die4hw70e/image/upload/v1728483693/samu-img/user_avatar_sirmyv.jpg'
    },
    {
      name: 'Leticia Delvalle',
      address: 'Coronel Bogado',
      message: 'Nuevo aviso',
      avatar: 'https://res.cloudinary.com/die4hw70e/image/upload/v1728483693/samu-img/user_avatar_sirmyv.jpg'
    },
    {
      name: 'Leticia Delvalle',
      address: 'Coronel Bogado',
      message: 'Nuevo aviso',
      avatar: 'https://res.cloudinary.com/die4hw70e/image/upload/v1728483693/samu-img/user_avatar_sirmyv.jpg'
    },
    {
      name: 'Leticia Delvalle',
      address: 'Coronel Bogado',
      message: 'Nuevo aviso',
      avatar: 'https://res.cloudinary.com/die4hw70e/image/upload/v1728483693/samu-img/user_avatar_sirmyv.jpg'
    },
    {
      name: 'Leticia Delvalle',
      address: 'Coronel Bogado',
      message: 'Nuevo aviso',
      avatar: 'https://res.cloudinary.com/die4hw70e/image/upload/v1728483693/samu-img/user_avatar_sirmyv.jpg'
    },
  ];

  onClick(): void {
    this.userClicked.emit({
      userId: 'abc12344444',
      selected: true
    });
  }

}
