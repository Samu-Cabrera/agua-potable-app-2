import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environments.dev';
import { UserList } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly _http = inject(HttpClient);
  private readonly _urlApi = environment.apiUrl;

  getUser(): Observable<UserList>{
    return this._http.get<UserList>(`${ this._urlApi }/user/list`);
  }
  
}
