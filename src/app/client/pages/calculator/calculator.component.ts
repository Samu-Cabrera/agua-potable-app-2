import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConsumoService } from '../../services/consumo.service';
import { map, switchMap } from 'rxjs';
import { DecimalPipe, NgClass, TitleCasePipe } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';


export interface Consumo {
  _id:          string;
  userID:       string;
  lectura:      number;
  limite:       number;
  fechaLectura: Date;
  fechaLimite:  Date;
  createdAt:    Date;
  updatedAt:    Date;
}


@Component({
  selector: 'app-calculator',
  standalone: true,
  imports: [
    DecimalPipe,
    TitleCasePipe,
    ReactiveFormsModule,
    NgClass
  ],
  templateUrl: './calculator.component.html',
  styleUrl: './calculator.component.scss'
})
export class CalculatorComponent implements OnInit {
  private readonly _activatedRoute = inject(ActivatedRoute);
  private readonly _consumoService = inject(ConsumoService);
  public consumo!: Consumo;
  public lecturaActual: number = 0;
  public lectura: number = 0;
  public tiempoConsumo: number = 0;
  public input: FormControl = new FormControl('');

  ngOnInit(): void {
    this._activatedRoute.params.pipe(
      switchMap(({ id }) => this._consumoService.getConsumos(id)),
      map((res: any) => res.lecturas)
    ).subscribe(res => {
      this.consumo = res[res.length - 1];
    });
  }

  calcularTiempoConsumo(fechaInicio: string, fechaFin: string): void {
    const inicio = new Date(fechaInicio);
    const fin = new Date(fechaFin);
    const diferenciaEnMilisegundos = fin.getTime() - inicio.getTime();
    const diferenciaDia = Math.floor(Math.abs(diferenciaEnMilisegundos / (1000 * 60 * 60 * 24)));
    this.tiempoConsumo = diferenciaDia;
  }

  calcularConsumo(): void {
    const today = new Date();
    const value = this.input.value;
    this.lecturaActual = Number(this.input.value);
    this.lectura = value - this.consumo.lectura;
    this.calcularTiempoConsumo(this.consumo.createdAt.toString(), today.toString());
    this.input.reset('');
  }


}
