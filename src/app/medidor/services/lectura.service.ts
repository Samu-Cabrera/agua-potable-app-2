import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environments.dev';
import { Observable } from 'rxjs';
import { Lectura, UltimaLectura } from '../interfaces/lectura.interface';


@Injectable({
    providedIn: 'root'
})
export class LecturaService {

    private readonly api_url = environment.apiUrl;
    private readonly _http = inject(HttpClient);

    getLectura(id: string): Observable<Lectura> {
        return this._http.get<Lectura>(`${ this.api_url }/api/lectura/actual/${ id }`);
    }

    createLectura(lectura: UltimaLectura): Observable<Lectura>{
        return this._http.post<Lectura>(`${ this.api_url }/api/lectura`, lectura);
    }

    updateLimit(id: string, limite: number): Observable<UltimaLectura>{
        return this._http.put<UltimaLectura>(`${ this.api_url }/api/lectura/${ id }`, { limite });
    }

}