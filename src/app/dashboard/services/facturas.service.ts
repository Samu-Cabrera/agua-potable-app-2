import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface Factura {
  ok:      boolean;
  factura: FacturaElement[];
}

interface FacturaElement {
  consumo:          Consumo;
  _id:              string;
  userID:           UserID;
  nroFactura:       number;
  fechaEmision:     Date;
  fechaVencimiento: Date;
  cuentaTotal:      number;
  estadoPago:       boolean;
  createdAt:        Date;
  updatedAt:        Date;
}

interface Consumo {
  cantidad: number;
  iva:      number;
  precio:   number;
  fecha:    Date;
}

interface UserID {
  _id:       string;
  nombre:    string;
  apellido:  string;
  ci:        number;
  direccion: string;
}

@Injectable({
  providedIn: 'root'
})
export class FacturasService {
  private readonly _apiUrl = 'http://localhost:3000';
  private readonly _http = inject(HttpClient);

  getFacturas(): Observable<Factura[]>{
    const url = '/api/user/factura/'
    return this._http.get<Factura[]>(`${ this._apiUrl }${ url }`);
  }

  getFacturasById(id: string): Observable<Factura>{
    const url = `${ this._apiUrl }/api/user/factura/${ id }`;
    return this._http.get<Factura>(url);
  }

  facturaById(id: string): Observable<FacturaElement> {
    const url = `${this._apiUrl}/api/user/factura/find/${ id }`;
    return this._http.get<FacturaElement>(url);
  }
  
}
