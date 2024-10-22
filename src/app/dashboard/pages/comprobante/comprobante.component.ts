import { Component } from '@angular/core';
import { MenuSuperiorComponent } from '../../shared/menu-superior/menu-superior.component';
import { InputComponent } from "../../shared/input/input.component";

@Component({
  selector: 'app-comprobante',
  standalone: true,
  imports: [
    MenuSuperiorComponent,
    InputComponent
],
  templateUrl: './comprobante.component.html',
  styleUrl: './comprobante.component.scss'
})
export class ComprobanteComponent {

  submit(): void {
    console.log('save');
  }
}
