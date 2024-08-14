import { Component, OnInit, inject } from '@angular/core';
import { DatePipe, DecimalPipe, NgClass, TitleCasePipe } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap, forkJoin } from 'rxjs';
import { ModalComponent } from '../../../shared/modal/modal.component';
import { FacturaElement } from '../../interfaces/factura.interface';
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
  private readonly _fb = inject(FormBuilder);
  private readonly _facturaService = inject(FacturaService);
  private readonly _lecturaService = inject(LecturaService);
  private readonly _validatorService = inject(ValidatorsServices);


  public openModal: boolean = false;
  public ultimaFactura!: FacturaElement;
  public facturaPendiente!: FacturaElement[];
  public lecturaConsumo!: number;
  public costoConsumo: number = 0;


  public myForm: FormGroup = this._fb.group({
    precio: ['', [
      Validators.required
    ]],
    iva: ['', [
      Validators.required
    ]],
    vence: new FormControl<Date | null>(null, Validators.required)
  });

  isValidField(field: string): boolean | null {
    return this._validatorService.isValidField(this.myForm, field);
  }

  ngOnInit(): void {
    this.loadData();
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

  onCloseModal(): void{
    this.openModal = false;
    this.myForm.reset();

  }

  abrirModal(): void {
    this.openModal = true;
  }

  onSubmit(): void {
    if(this.myForm.invalid) return;
  }

}
