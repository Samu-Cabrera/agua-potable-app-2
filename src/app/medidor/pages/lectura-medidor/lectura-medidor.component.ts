import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { DatePipe, DecimalPipe, NgClass, TitleCasePipe } from '@angular/common';
import { switchMap } from 'rxjs/operators';
import { UserService } from '../../services/user.service';
import { LecturaService } from '../../services/lectura.service';
import { User } from '../../interfaces/user.interface';
import { PhotoPipe } from '../../pipes/photo.pipe';
import { UserPhotoComponent } from "../../components/user-photo/user-photo.component";
import { SharedInputComponent } from '../../../shared/shared-input/shared-input.component';
import { CircleProgressComponent } from '../../../shared/circle-progress/circle-progress.component';
import { Lectura } from '../../interfaces/lectura.interface';
import { Card } from '../../interfaces/card.interface';

@Component({
  selector: 'lectura-medidor',
  standalone: true,
  imports: [
    NgClass,
    RouterLink,
    TitleCasePipe,
    DatePipe,
    PhotoPipe,
    DecimalPipe,
    UserPhotoComponent,
    SharedInputComponent,
    CircleProgressComponent,
],
  templateUrl: './lectura-medidor.component.html',
  styleUrl: './lectura-medidor.component.scss'
})
export class LecturaMedidorComponent implements OnInit {

  private readonly _activatedRouter = inject(ActivatedRoute);
  private readonly _router = inject(Router);
  private readonly _userService = inject(UserService);
  private readonly _lecturaService = inject(LecturaService);
  
  public user?: User;
  public lecturaData!: Lectura;
  public cards!: Card[];

  ngOnInit(): void {
    this._activatedRouter.params.pipe(
      switchMap(({ id }) => this._userService.getUserById(id))
    ).subscribe(res => {
      if(!res) return this._router.navigate(['medidor/users']);
      this.user = res;
      return;
    });

    this._activatedRouter.params.pipe(
      switchMap(({ id }) => this._lecturaService.getLectura(id)),
    ).subscribe(data => {
      this.lecturaData = data;
      this.inicializarCard();
    });
  }

  private inicializarCard(): void {
    this.cards =  [
      {
        title: 'Actual',
        icon: 'ri-pencil-line',
        value: this.lecturaData.consumoActual,
        fecha: this.lecturaData.ultimaLectura.fechaLectura,
        className: 'actual'
      },
      {
        title: 'Limite',
        icon: 'ri-pencil-line',
        value: this.lecturaData.ultimaLectura.limite,
        fecha: this.lecturaData.ultimaLectura.fechaLimite,
        className: 'limite'
      },
    ]
  }

  onBack(): void {
    this._router.navigate(['/medidor/users']);
  }

  haddleValue(value: string): void {
    console.log(value);
  }
}
