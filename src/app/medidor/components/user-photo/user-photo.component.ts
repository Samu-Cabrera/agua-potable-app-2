import { Component, Input } from '@angular/core';

@Component({
  selector: 'user-photo',
  standalone: true,
  imports: [],
  templateUrl: './user-photo.component.html',
  styleUrl: './user-photo.component.scss'
})
export class UserPhotoComponent {

  @Input() src: string = '';
  @Input() alt: string = 'Alt';

}
