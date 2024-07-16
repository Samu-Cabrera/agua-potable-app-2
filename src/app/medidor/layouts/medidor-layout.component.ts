import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'medidor-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterModule
  ],
  templateUrl: './medidor-layout.component.html',
  styleUrl: './medidor-layout.component.scss'
})
export class MedidorLayoutComponent {

}
