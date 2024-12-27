import { Component, inject, OnInit } from '@angular/core';
import { DoughnutChartComponent } from '../../../components/doughnut-chart/doughnut-chart.component';
import { UsuariosService } from '../../../services/usuarios.service';
import { map } from 'rxjs';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [
    DoughnutChartComponent,
    DecimalPipe
  ],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.scss'
})
export class UsuariosComponent implements OnInit {
  private readonly _userService = inject(UsuariosService);
  public labels: string[] = ['Eliminados', 'Activos'];
  public data!: { data1: number, data2: number };
  public year: number[] = [2024, 2023];

  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void {
    this._userService.getUsuarios().pipe(
      map(user => user.usuarios)
    ).subscribe((users: any[]) => {
      const data1 = users.filter(user => user.estado === 'activo');
      const data2 = users.filter(user => user.estado === 'eliminado');
      this.data = { data1: data1.length, data2: data2.length };
    });
  }

}
