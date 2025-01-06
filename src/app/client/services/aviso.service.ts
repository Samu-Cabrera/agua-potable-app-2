import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environments.dev';
import { Aviso } from '../Interfaces/avisos.interface';

@Injectable({
    providedIn: 'root'
})
export class AvisoService {
    private readonly _http = inject(HttpClient);
    private readonly _urlApi: string = environment.apiUrl;

    getAvisos(): Observable<Aviso[]>{
        const uri: string = 'api/aviso/';
        return this._http.get<Aviso[]>(`${ this._urlApi }/${ uri }`);
    }
}