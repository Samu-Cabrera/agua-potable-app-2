import { Component } from '@angular/core';
import { MenuSuperiorComponent } from '../../shared/menu-superior/menu-superior.component';
import { InputComponent } from "../../shared/input/input.component";
import { ButtonComponent } from "../../shared/button/button.component";
import { SharedComprobanteComponent } from '../../shared/shared-comprobante/shared-comprobante.component';

@Component({
  selector: 'app-comprobante',
  standalone: true,
  imports: [
    MenuSuperiorComponent,
    InputComponent,
    SharedComprobanteComponent,
    ButtonComponent,
],
  templateUrl: './comprobante.component.html',
  styleUrl: './comprobante.component.scss'
})
export class ComprobanteComponent {

  public imprimirCompUrl = '/dashboard/imprimir/comprobante/1'

  submit(): void {
    console.log('save');
  }
}
