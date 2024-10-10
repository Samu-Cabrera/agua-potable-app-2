import { Component } from '@angular/core';
import { MenuSuperiorComponent } from './../../shared/menu-superior/menu-superior.component';
import { LineChartComponent } from '../../components/line-chart/line-chart.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MenuSuperiorComponent,
    LineChartComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
