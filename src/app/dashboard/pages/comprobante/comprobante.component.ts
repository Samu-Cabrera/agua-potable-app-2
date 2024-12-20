import { Component, inject, OnInit } from '@angular/core';
import { MenuSuperiorComponent } from '../../shared/menu-superior/menu-superior.component';
import { InputComponent } from "../../shared/input/input.component";
import { ButtonComponent } from "../../shared/button/button.component";
import { Comprobante, SharedComprobanteComponent } from '../../shared/shared-comprobante/shared-comprobante.component';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { Factura } from '../../interfaces/facturas.interfaces';
import { FacturasService } from '../../services/facturas.service';
import { Recibo } from '../../interfaces/recibo.interface';
import { ReciboService } from '../../services/recibo.service';
import { ReactiveFormsModule } from '@angular/forms';

interface ReciboData {
  servicio: string;
  formaPago: string;
  tesorero: string; 
  importe: number;
}

@Component({
  selector: 'app-comprobante',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MenuSuperiorComponent,
    InputComponent,
    SharedComprobanteComponent,
    ButtonComponent,
],
  templateUrl: './comprobante.component.html',
  styleUrl: './comprobante.component.scss'
})
export class ComprobanteComponent implements OnInit {
  private readonly _activatedRoute = inject(ActivatedRoute);
  private readonly _facturaService = inject(FacturasService);
  private readonly _reciboService = inject(ReciboService);
  private _facturasPendientes!: Factura[];
  private _recibos!: Recibo[];
  private _userData!: any;
  public userId!: string;
  public imprimirCompUrl!: string;
  public comprobante!: Comprobante;
  ngOnInit(): void {
    this.loadFacturas();
    this.loadRecibos();
  }

  loadFacturas(): void {
    this._activatedRoute.params.pipe(
      switchMap(({ id }) => {
        this.userId = id;
        return this._facturaService.getFacturasById(id);
      }),
    ).subscribe((respuesta: any) => {
      this._facturasPendientes = respuesta.factura.filter((factura: any) => factura.estadoPago === false);
    });
  }

  loadRecibos(): void {
    this._reciboService.getRecibos()
      .subscribe(recibos => {
        this._recibos = recibos;
        this._userData = recibos[0].userID;
        this.asignarRecibo();
      });
  }

  asignarRecibo(): void {
    this.comprobante = this.comprobanteData({
      servicio: 'agua potable',
      formaPago: 'contado',
      tesorero: 'lisia mariana',
      importe: 200000
    });
  }

  comprobanteData(recibo: ReciboData): Comprobante {
    const ultimoNroRecibo = this._recibos[this._recibos.length - 1].nroRecibo;
    return  {
      nroRecibo: ultimoNroRecibo + 1,
      username: `${ this._userData.nombre } ${ this._userData.apellido }`,
      ci: this._userData.ci,
      userAdress: this._userData.direccion,
      factura: this._facturasPendientes,
      servicio: recibo.servicio,
      formaPago: recibo.formaPago,
      tesorero: recibo.tesorero,
      importe: recibo.importe,
      fecha: new Date().toDateString(),
      totalCuenta: this._facturasPendientes.reduce((total, factura) => total + factura.cuentaTotal, 0)
    } 
  }

  onValueImporte(value: string)  {
    this.comprobante.importe = Number(value);
  }

  onValueTesorero(value: string)  {
    this.comprobante.tesorero = value;
  }
  
  submit(): void {
    const id = this._recibos[0].userID._id;
    const data: ReciboData = {
      servicio: this.comprobante.servicio,
      formaPago: this.comprobante.formaPago,
      tesorero: this.comprobante.tesorero,
      importe: this.comprobante.importe
    }

    this._reciboService.postRecibo(id, data).subscribe(data => {
      this.imprimirCompUrl = `/dashboard/imprimir/comprobante/${ this.userId }`;
    });
    
  }
}
