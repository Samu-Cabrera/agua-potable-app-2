import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Recibo } from './../interfaces/recibo.interface';

interface ReciboData {
  servicio: string;
  formaPago: string;
  tesorero: string; 
  importe: number;
}

@Injectable({
  providedIn: 'root'
})
export class ReciboService {
  private readonly _apiUrl = 'http://localhost:3000';
  private readonly _http = inject(HttpClient);

  getRecibos(): Observable<Recibo[]>{
    const url = '/api/recibo/';
    return this._http.get<Recibo[]>(`${ this._apiUrl }${ url }`);
  }

  getRecibosById(id: string): Observable<Recibo[]>{
    const url = `${ this._apiUrl }/api/recibo/${ id }`;
    return this._http.get<Recibo[]>(url);
  }
  
  postRecibo(id: string, recibo: ReciboData): Observable<Recibo>{
    const url = `${ this._apiUrl }/api/recibo/${ id }`;
    return this._http.post<Recibo>(url, recibo);
  }
}
