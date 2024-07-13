import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../../environments/environments.dev';
import { UserRegister, User, UserLogin, UserLoginMsg } from '../interfaces/user.interface';


@Injectable({
    providedIn: 'root',
})
export class UserServices{

    private readonly _http = inject(HttpClient);
    private readonly _url = environment.apiUrl;


    login(data: UserLogin): Observable<UserLoginMsg> {
        return this._http.post<UserLoginMsg>(`${ environment.apiUrl }/api/login/`, data).pipe(
            tap((res: UserLoginMsg) => {
                if(res.token) localStorage.setItem('token', res.token);
            })
        );
    }

    register(data: User): Observable<UserRegister> {
        return this._http.post<UserRegister>(`${this._url}/user/register/`, data);
    }
    
}