import { Component } from '@angular/core';
import { MenuSuperiorComponent } from '../../shared/menu-superior/menu-superior.component';
import { InputComponent } from "../../shared/input/input.component";
import { ButtonComponent } from "../../shared/button/button.component";

@Component({
  selector: 'app-comprobante',
  standalone: true,
  imports: [
    MenuSuperiorComponent,
    InputComponent,
    ButtonComponent
],
  templateUrl: './comprobante.component.html',
  styleUrl: './comprobante.component.scss'
})
export class ComprobanteComponent {

  submit(): void {
    console.log('save');
  }
}
