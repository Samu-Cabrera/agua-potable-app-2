import { SharedInputComponent } from './../../../shared/shared-input/shared-input.component';
import { Component } from '@angular/core';
import { MenuSuperiorComponent } from '../../shared/menu-superior/menu-superior.component';
import { TableComponent } from '../../shared/table/table.component';

@Component({
  selector: 'app-comprobante',
  standalone: true,
  imports: [
    MenuSuperiorComponent,
    SharedInputComponent,
    TableComponent
  ],
  templateUrl: './comprobante.component.html',
  styleUrl: './comprobante.component.scss'
})
export class ComprobanteComponent {

}
