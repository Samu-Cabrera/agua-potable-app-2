import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario, Usuarios } from '../interfaces/usuarios.interface';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private readonly _http = inject(HttpClient);
  private readonly _urlApi: string = 'http://localhost:3000';

  getUsuarios(): Observable<Usuarios> {
    const uri: string = 'user/list';
    return this._http.get<Usuarios>(`${ this._urlApi }/${ uri }`);
  }

  getUserById(id: string): Observable<Usuario>{
    const uri: string = `user/${ id }`;
    return this._http.get<Usuario>(`${ this._urlApi }/${ uri }`);
  }
  
}
