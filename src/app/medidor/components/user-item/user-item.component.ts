import { Component, Input } from '@angular/core';
import { UserPhotoComponent } from '../user-photo/user-photo.component';

@Component({
  selector: 'user-item',
  standalone: true,
  imports: [
    UserPhotoComponent
  ],
  templateUrl: './user-item.component.html',
  styleUrl: './user-item.component.scss'
})
export class UserItemComponent {

  @Input() name: string = 'Jonh Smith';
  @Input() address: string = 'Coronel Bogado, Itapúa';
  @Input() srcImg: string = '';
  @Input() altImg: string = '';

}
