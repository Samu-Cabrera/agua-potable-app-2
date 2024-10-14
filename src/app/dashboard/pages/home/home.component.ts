import { Component } from '@angular/core';
import { MenuSuperiorComponent } from './../../shared/menu-superior/menu-superior.component';
import { LineChartComponent } from '../../components/line-chart/line-chart.component';
import { DoughnutChartComponent } from '../../components/doughnut-chart/doughnut-chart.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MenuSuperiorComponent,
    LineChartComponent,
    DoughnutChartComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
