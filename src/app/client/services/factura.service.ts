import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environments.dev';
import { Factura } from '../Interfaces/factura.interface';

@Injectable({
    providedIn: 'root'
})
export class FacturaService {
    private readonly _urlBase = environment.apiUrl;
    private readonly _http = inject(HttpClient);

    getFacturaByUserId(id: string): Observable<Factura>{
        const api = `${ this._urlBase }/api/user/factura/${ id }`;
        return this._http.get<Factura>(api);
    }
}