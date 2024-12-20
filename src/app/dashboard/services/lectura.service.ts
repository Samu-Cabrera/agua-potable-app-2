import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Lectura } from "../interfaces/lectura.interface";


@Injectable({
    providedIn: 'root'
})
export class LecturaService {
    private readonly _http = inject(HttpClient);
    private readonly _api = 'http://localhost:3000';

    getLecturaById(id: string): Observable<Lectura>{
        const url = `${ this._api }/api/lectura/actual/${ id }` ;
        return this._http.get<Lectura>(url);
    }
}