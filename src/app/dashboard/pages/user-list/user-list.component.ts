import { Component } from '@angular/core';
import { MenuSuperiorComponent } from '../../shared/menu-superior/menu-superior.component';
import { SharedInputComponent } from '../../../shared/shared-input/shared-input.component';
import { TableComponent } from '../../shared/table/table.component';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    MenuSuperiorComponent,
    SharedInputComponent,
    TableComponent,
  ],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent {

}
