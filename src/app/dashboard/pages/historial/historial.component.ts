import { Component } from '@angular/core';
import { MenuSuperiorComponent } from '../../shared/menu-superior/menu-superior.component';
import { TableComponent } from '../../shared/table/table.component';

@Component({
  selector: 'app-historial',
  standalone: true,
  imports: [
    MenuSuperiorComponent,
    TableComponent
  ],
  templateUrl: './historial.component.html',
  styleUrl: './historial.component.scss'
})
export class HistorialComponent {
  
}
