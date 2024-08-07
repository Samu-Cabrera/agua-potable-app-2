import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { DatePipe, DecimalPipe, NgClass, TitleCasePipe, } from '@angular/common';
import { switchMap } from 'rxjs/operators';
import { UserService } from '../../services/user.service';
import { LecturaService } from '../../services/lectura.service';
import { User } from '../../interfaces/user.interface';
import { PhotoPipe } from '../../pipes/photo.pipe';
import { UserPhotoComponent } from "../../components/user-photo/user-photo.component";
import { SharedInputComponent } from '../../../shared/shared-input/shared-input.component';
import { CircleProgressComponent } from '../../../shared/circle-progress/circle-progress.component';
import { Lectura, UltimaLectura } from '../../interfaces/lectura.interface';
import { Card } from '../../interfaces/card.interface';
import { ModalComponent } from '../../../shared/modal/modal.component';

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
    ModalComponent
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
  public mostrarGrafico: boolean = true;
  public openModal: boolean = false;
  public inputValid: boolean = true;
  public lecturaValue!: number;
  public limiteValue!: number;

  ngOnInit(): void {
    this._activatedRouter.params.pipe(
      switchMap(({ id }) => this._userService.getUserById(id))
    ).subscribe(res => {
      if(!res) return this._router.navigate(['medidor/users']);
      this.user = res;
      return;
    });

    this.getLectura();
  }

  getLectura(): void {
    this._activatedRouter.params.pipe(
      switchMap(({ id }) => this._lecturaService.getLectura(id)),
    ).subscribe(data => {
      if(data.ok){
        this.lecturaData = data;
        this.inicializarCard();
        return;
      } 
      this.mostrarGrafico = false;
  
    });
  }


  private inicializarCard(): void {
    this.cards =  [
      {
        title: 'Actual',
        value: this.lecturaData.consumoActual,
        fecha: this.lecturaData.ultimaLectura.fechaLectura,
        className: 'actual'
      },
      {
        title: 'Limite',
        icon: 'ri-pencil-line',
        value: this.lecturaData.ultimaLectura.limite,
        fecha: this.lecturaData.ultimaLectura.fechaLimite,
        className: 'limite',
        onAction: this.onEditLimite.bind(this)
      },
    ]
  }

  inputValueChanges(value: string): void{
    this.limiteValue = Number(value);
  }

  onEditLimite(): void{
    this.openModal = true;
    const limitId = this.lecturaData.ultimaLectura._id!;
    if(this.limiteValue > 0){
      this._lecturaService.updateLimit(limitId, this.limiteValue).subscribe(data => {
        if(data){
          this.getLectura();
          this.inicializarCard();
        }
        return;
      });
    }

  }

  onCloseModal(): void {
    this.openModal = false;
  }

  onBack(): void {
    this._router.navigate(['/medidor/users']);
  }

  haddleValue(value: string): void {
    if(Number(value) < this.lecturaData.ultimaLectura.lectura){
      this.inputValid = false;
      return;
    }

    const userID = this._activatedRouter.snapshot.paramMap.get('id');
    const lectura: UltimaLectura = {
      userID,
      lectura: Number(value),
      limite: this.lecturaData.ultimaLectura.limite,
      fechaLectura: new Date(),
      fechaLimite: this.lecturaData.ultimaLectura.fechaLimite
    }

    this._lecturaService.createLectura(lectura).subscribe(lectura => {
      if(lectura.ok){
        this.lecturaData = lectura;
        this.inicializarCard();
      }
    });

  }

  onGenerarFactura(): void {
    this._router.navigateByUrl(`medidor/factura/user/${ this.lecturaData.ultimaLectura.userID }`);
  }


}
