import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Aviso } from '../interfaces/Aviso.interface';

interface AvisoResponse {
    userId: string,
    mensaje: string,
    leido: boolean
}

@Injectable({
    providedIn: 'root'
})
export class AvisoService {
    private readonly _http = inject(HttpClient);
    private readonly _urlApi: string = 'http://localhost:3000';

    getAvisos(): Observable<Aviso[]> {
        const uri: string = 'api/aviso/';
        return this._http.get<Aviso[]>(`${ this._urlApi }/${ uri }`);
    }
    
    getAvisoById(id: string): Observable<Aviso[]> {
        const uri: string = `api/aviso/${ id }`;
        return this._http.get<Aviso[]>(`${ this._urlApi }/${ uri }`);
    }

    posAviso(aviso: AvisoResponse): Observable<Aviso>{
        const uri = `${ this._urlApi }/api/aviso/crear`;
        return this._http.post<Aviso>(uri, aviso);
    }
}