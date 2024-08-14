import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environments.dev';
import { Consumo, Factura, FacturaElement } from '../interfaces/factura.interface';

@Injectable(
    { providedIn: 'root' }
)
export class FacturaService {
    private readonly _url = environment.apiUrl;
    private readonly _http = inject(HttpClient);

    getFacturasPendientes(userId: string): Observable<Factura> {
        return this._http.get<Factura>(`${ this._url }/api/user/factura/${ userId }`);
    }

    getFacturasAll(userId: string): Observable<Factura> {
        return this._http.get<Factura>(`${ this._url }/api/user/factura/all/${ userId }`);
    }

    createFactura(userID: string, factura: Consumo): Observable<FacturaElement>{
        return this._http.post<FacturaElement>(`${ this._url }/api/user/factura/${ userID }`, factura);
    }
}
