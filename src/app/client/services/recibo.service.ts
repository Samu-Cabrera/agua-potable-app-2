import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environments.dev";
import { Recibo } from "../Interfaces/recibo.interface";

@Injectable({
    providedIn: 'root'
})
export class ReciboService {
    private readonly _http = inject(HttpClient);
    private readonly _urlApi = environment.apiUrl;

    getReciboByUserId(id: string): Observable<Recibo[]>{
        const api = `${ this._urlApi }/api/recibo/${ id }`;
        return this._http.get<Recibo[]>(api);
    }
}