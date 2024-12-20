import { RouterModule } from '@angular/router';
import { Component } from '@angular/core';
import { MenuSuperiorComponent } from '../../shared/menu-superior/menu-superior.component';

@Component({
  selector: 'app-estadistica',
  standalone: true,
  imports: [
    RouterModule,
    MenuSuperiorComponent
  ],
  templateUrl: './estadistica.component.html',
  styleUrl: './estadistica.component.scss'
})
export class EstadisticaComponent {

}
