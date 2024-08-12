import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { DatePipe, DecimalPipe, NgClass, TitleCasePipe } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs';
import { ModalComponent } from '../../../shared/modal/modal.component';
import { Consumo, Factura, UserID, FacturaElement } from '../../interfaces/factura.interface';
import { FacturaService } from '../../services/factura.service';
import { LecturaService } from '../../services/lectura.service';
import { ValidatorsServices } from '../../../auth/services/validators.service';

@Component({
  selector: 'app-factura',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    TitleCasePipe,
    DecimalPipe,
    DatePipe,
    NgClass,
    ModalComponent,
  ],
  templateUrl: './factura.component.html',
  styleUrl: './factura.component.scss'
})
export class FacturaComponent implements OnInit {

  private readonly _activatedRoute = inject(ActivatedRoute);
  private readonly _cdr = inject(ChangeDetectorRef);
  private readonly _fb = inject(FormBuilder);
  private readonly _facturaService = inject(FacturaService);
  private readonly _lecturaService = inject(LecturaService);
  private readonly _validatorService = inject(ValidatorsServices);


  public openModal: boolean = false;
  public user!: UserID;
  public facturaPendiente!: FacturaElement;
  public factura!: FacturaElement;
  public nroFactura: number = 0;
  public consumo!: Consumo;
  public lecturaConsumo: number = 0;
  public totalAPagar: number = 0;


  public myForm: FormGroup = this._fb.group({
    precio: ['', [
      Validators.required
    ]],
    iva: ['', [
      Validators.required
    ]],
    vence: new FormControl<Date | null>(null, Validators.required)
  });

  ngOnInit(): void {
    this.getUser();
    this.getLectura();
  }

  isValidField(field: string): boolean | null {
    return this._validatorService.isValidField(this.myForm, field);
  }

  getUser(): void {
    this._activatedRoute.params.pipe(
      switchMap(({ id }) => this._lecturaService.getLectura(id))
    ).subscribe(({ ultimaLectura }) => {
      this.lecturaConsumo = ultimaLectura.lectura;
    });
  }

  getLectura(): void {
    this._activatedRoute.params.pipe(
      switchMap(({ id }) => this._facturaService.getFacturasPendientes(id)),
      map((factura: Factura) => factura.factura)
    ).subscribe(factura => {
      this.user = factura[factura.length - 1].userID;
      this.nroFactura = factura[factura.length - 1].nroFactura + 1;
    });
  }

  createFactura(): void {
    const userId: string = this.user._id;
    const consumo: Consumo = {
      cantidad: this.lecturaConsumo,
      iva: this.myForm.controls['iva'].value,
      precio: this.myForm.controls['precio'].value,
      fecha: new Date(),
      fechaVencimiento: this.myForm.controls['vence'].value,
      cuentaTotal: this.myForm.controls['precio'].value * this.lecturaConsumo
    };

    this._facturaService.createFactura(userId, consumo).subscribe((factura: FacturaElement)  => {
      this.consumo = factura.consumo;
      this._cdr.detectChanges();
    });
  }

  onCloseModal(): void{
    this.openModal = false;
    this.myForm.reset();

  }

  establecerDatosConsumo(): void {
    this.openModal = true;
  }

  onSubmit(): void {
    if(this.myForm.invalid) return;
    this.createFactura();
  }

}
