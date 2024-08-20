import { Component, OnInit, inject } from '@angular/core';
import { DatePipe, DecimalPipe, NgClass, TitleCasePipe } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap, forkJoin, of, timer } from 'rxjs';
import { ModalComponent } from '../../../shared/modal/modal.component';
import { Consumo, FacturaElement } from '../../interfaces/factura.interface';
import { FacturaService } from '../../services/factura.service';
import { LecturaService } from '../../services/lectura.service';
import { ValidatorsServices } from '../../../auth/services/validators.service';
import { ButtonComponent } from '../../components/button/button.component';

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
    ButtonComponent
  ],
  templateUrl: './factura.component.html',
  styleUrl: './factura.component.scss'
})
export class FacturaComponent implements OnInit {

  private readonly _activatedRoute = inject(ActivatedRoute);
  private readonly _router = inject(Router);
  private readonly _fb = inject(FormBuilder);
  private readonly _facturaService = inject(FacturaService);
  private readonly _lecturaService = inject(LecturaService);
  private readonly _validatorService = inject(ValidatorsServices);


  public openModal: boolean = false;
  public ultimaFactura!: FacturaElement;
  public facturaPendiente!: FacturaElement[];
  public lecturaConsumo!: number;
  private costoConsumo: number = 0;
  public fechaEmision: Date = new Date();
  public venceFecha!: Date;


  public myForm: FormGroup = this._fb.group({
    precio: [''],
    iva: [''],
    venceEn: ['']
  });

  isValidField(field: string): boolean | null {
    return this._validatorService.isValidField(this.myForm, field);
  }

  ngOnInit(): void {
    this.loadData();
    this.establecerFechaVencimiento(7);
  }

  loadData(): void {
    this._activatedRoute.params
    .pipe(
      switchMap(({ id }) => forkJoin({
        lectura: this._lecturaService.getLectura(id),
        factura: this._facturaService.getFacturasAll(id).pipe(map(factura => factura.factura))
      }))
    )
    .subscribe(({ lectura, factura }) => {
      const { consumo } = factura[factura.length - 1];
      const lecturaMedidor = lectura.consumoActual;
      this.lecturaConsumo = lecturaMedidor;
      this.ultimaFactura = factura[factura.length - 1];
      this.costoConsumo = (lecturaMedidor * consumo.precio) + ((lecturaMedidor * consumo.precio) * consumo.iva / 100);
      this.facturaPendiente = factura.filter(factura => !factura.estadoPago);

    });
  }

  get getCuentaPiendiente(): number {
    if(!this.facturaPendiente) return 0;
    const total = this.facturaPendiente.reduce((suma, cuenta) => suma + cuenta.cuentaTotal, 0);
    return total;
  }

  get getCostoConsumo(): number {
    return this.costoConsumo;
  }

  get getformData(): Consumo {
    const { iva, precio } = this.myForm.value;
    const cantidad = this.lecturaConsumo;

    const consumo = {
      cantidad,
      iva,
      precio,
      fechaVencimiento: this.venceFecha
    }

    return consumo;
  }

  get navigateUrl(): string {
    return `medidor/user/factura/${ this.ultimaFactura.userID._id }`;
  }

  previous(): void {
    this._router.navigateByUrl(`medidor/user/${ this.ultimaFactura.userID._id }`);
  }

  establecerFechaVencimiento(day: number): void {
    this.venceFecha = new Date(this.fechaEmision);
    this.venceFecha.setDate(this.venceFecha.getDate() + day);
  }

  onCloseModal(): void{
    this.openModal = false;
    this.myForm.reset();

  }

  abrirModal(): void {
    this.openModal = true;
    const { iva, precio } = this.ultimaFactura.consumo;
    this.myForm.reset({ precio, iva, venceEn: 7 });
  }

  updateFacturaData(): void {
    if(this.myForm.invalid) return;

    this._facturaService.updateFacturaById(this.ultimaFactura._id, this.getformData).subscribe(() => this.loadData());
    
    timer(2500).pipe(
      switchMap(() => {
        return timer(500)
      })
    ).subscribe(() => this.openModal = false);
  }

  onSubmit(): void {
    if(this.myForm.invalid) return;
    const { iva, precio } = this.ultimaFactura.consumo;
    const cantidad = this.lecturaConsumo;
    const fechaVencimiento = this.venceFecha;

    const consumo: Consumo = {
      cantidad,
      iva,
      precio,
      fechaVencimiento
    }

    this._facturaService.createFactura(this.ultimaFactura.userID._id, consumo).subscribe(() => of(true))

  }

}
