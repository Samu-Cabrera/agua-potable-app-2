import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environments.dev';
import { Observable } from 'rxjs';
import { Lectura } from '../interfaces/lectura.interface';


@Injectable({
    providedIn: 'root'
})
export class LecturaService {

    private readonly api_url = `${ environment.apiUrl }/api/lectura/actual`;
    private readonly _http = inject(HttpClient);
    
    getLectura(id: string): Observable<Lectura> {
        return this._http.get<Lectura>(`${ this.api_url }/${ id }`);
    }

}