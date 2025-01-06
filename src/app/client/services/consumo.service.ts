import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cons, Observable } from 'rxjs';
import { environment } from '../../../environments/environments.dev';
import { Consumo } from '../Interfaces/consumo.interface';

@Injectable({
    providedIn: 'root'
})
export class ConsumoService {
    private readonly _urlBase = environment.apiUrl;
    private readonly _http = inject(HttpClient);

    getConsumoActual(id: string): Observable<Consumo>{
        const api = `${ this._urlBase }/api/lectura/actual/${ id }`;
        return this._http.get<Consumo>(api);
    }

    getConsumos(id: string): Observable<Consumo[]>{
        const uri = `${ this._urlBase }/api/lectura/all/${ id }`;
        return this._http.get<Consumo[]>(uri);
    }
}