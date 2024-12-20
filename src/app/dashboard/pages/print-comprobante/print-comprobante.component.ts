import { Component, inject, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter, switchMap } from 'rxjs';
import { MenuSuperiorComponent } from '../../shared/menu-superior/menu-superior.component';
import { SharedComprobanteComponent } from '../../shared/shared-comprobante/shared-comprobante.component';
import { Recibo } from '../../interfaces/recibo.interface';
import { ReciboService } from '../../services/recibo.service';

export interface Comprobante {
  nroRecibo: number;
  username: string;
  ci: number;
  userAdress: string;
  factura: any[];
  servicio: string;
  formaPago: string;
  tesorero: string;
  importe: number;
  fecha: string;
  totalCuenta: number;
}

@Component({
  selector: 'app-print-comprobante',
  standalone: true,
  imports: [
    MenuSuperiorComponent,
    SharedComprobanteComponent,
    RouterLink
  ],
  templateUrl: './print-comprobante.component.html',
  styleUrl: './print-comprobante.component.scss'
})
export class PrintComprobanteComponent implements OnInit {
  @ViewChild('comprobante', { static: false }) comprobanteRef!: ElementRef;
  private readonly _router = inject(Router);
  private readonly _activatedRouter = inject(ActivatedRoute);
  private readonly _reciboService = inject(ReciboService);
  private _ultimoRecibo!: Recibo;
  public recibo!: Comprobante;

  ngOnInit(): void {
    this.scrollStart();
    this.loadRecibo();
  }

  loadRecibo(): void {
    this._activatedRouter.params.pipe(
      switchMap(({ id }) => this._reciboService.getRecibosById(id))
    ).subscribe(res => {
      this._ultimoRecibo = res[res.length - 1];
      this.filtrarRecibo();
    });
  }

  filtrarRecibo(): void {
    this.recibo = {
      nroRecibo: this._ultimoRecibo.nroRecibo,
      username: this._ultimoRecibo.userID.nombre,
      ci: this._ultimoRecibo.userID.ci,
      userAdress: this._ultimoRecibo.userID.direccion,
      factura: this._ultimoRecibo.facturas,
      servicio: this._ultimoRecibo.servicio,
      formaPago: this._ultimoRecibo.formaPago,
      tesorero: this._ultimoRecibo.tesorero,
      importe: this._ultimoRecibo.importe,
      fecha: this._ultimoRecibo.fechaEmision.toString(),
      totalCuenta: this._ultimoRecibo.total
    }
  }

  scrollStart(): void{
    this._router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => window.scrollTo(0, 0));
  }

  imprimirComprobante(): void {
    const contenido = this.comprobanteRef.nativeElement.innerHTML;
    const ventana = window.open('', '_blank', 'width=800,height=600');
    if (ventana) {
      ventana.document.open();
      ventana.document.write(`
        <html>
          <head>
            <title>Imprimir Comprobante</title>
            <style>
              /* Agrega estilos personalizados para la impresión */
              body {
                font-family: Arial, sans-serif;
                padding: 20px;
              }
              .modal__comprob {
                margin: auto;
                text-align: center;
              }
            </style>
          </head>
          <body>
            ${contenido}
          </body>
        </html>
      `);
      ventana.document.close();
      ventana.focus();
      ventana.print();
      ventana.close();
    }
  }

}
