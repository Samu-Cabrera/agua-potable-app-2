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

  getUserAll(): Observable<Usuario[]>{
    const uri: string = 'user/list-all';
    return this._http.get<Usuario[]>(`${ this._urlApi }/${ uri }`);
  }

  getUserById(id: string): Observable<Usuario>{
    const uri: string = `user/${ id }`;
    return this._http.get<Usuario>(`${ this._urlApi }/${ uri }`);
  }

  updateUser(id: string, userData: any): Observable<any> {
    const uri: string = `user/upload/${id}`;
    return this._http.put(`${this._urlApi}/${uri}`, userData);
  }

  deleteUser(id: string): Observable<any> {
    const uri: string = `user/delete/${id}`;
    return this._http.delete(`${this._urlApi}/${uri}`, {});
  }

  activateUser(id: string): Observable<any> {
    const uri: string = `user/activar/${id}`;
    return this._http.patch(`${this._urlApi}/${uri}`, { estado: 'activo' });
  }
  
}
