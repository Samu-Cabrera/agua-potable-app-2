import { Component, Input } from '@angular/core';
import { UserPhotoComponent } from '../user-photo/user-photo.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'user-item',
  standalone: true,
  imports: [
    RouterModule,
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
  @Input() userId: string = '';
}
