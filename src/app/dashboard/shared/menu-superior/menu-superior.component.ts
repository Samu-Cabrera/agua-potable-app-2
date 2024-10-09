import { Component, input } from '@angular/core';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'menu-superior',
  standalone: true,
  imports: [
    TitleCasePipe
  ],
  templateUrl: './menu-superior.component.html',
  styleUrl: './menu-superior.component.scss'
})
export class MenuSuperiorComponent {

  public itemName = input.required<string>();
  public userName = input.required<string>();
  public userGmail = input.required<string>();
  public avatarUrl = input.required<string>();

}
