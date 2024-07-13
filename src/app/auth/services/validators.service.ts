import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core'
import { FormGroup } from '@angular/forms' 
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environments.dev';
import { UserList } from '../interfaces/user.interface';

@Injectable({
    providedIn: 'root'
})
export class ValidatorsServices {
    
  private readonly _http = inject(HttpClient);
  private readonly _api_url = environment.apiUrl;

    //es valido el formulario
    public isValidField(form: FormGroup, field: string): boolean | null {
      return form.controls[field].errors && form.controls[field].touched;
    }

    public getFieldError(form: FormGroup, field: string): string | null {
        if(!form.controls[field]) return null;
    
        const errors = form.controls[field].errors || {};
    
        for(let keys of Object.keys(errors)) {
          switch(keys){
            case 'required': return 'Este campo es obligatorio.';
            case 'minLength': return `Este campo debe tener más de 5 caracteres.`;
            case 'maxLength': return 'Este campo debe tener menos de 15 caracteres.';
            case 'existeCI': return 'La cédula no esta registrada.';
            case 'userCI': return 'La cédula ya esta registrada.';
            case 'email': return 'El correo no es valido.';
            case 'existEmail': return 'El correo ya esta registrado.';
            case 'existPhone': return 'El teléfono ya esta registrado.';
          }
        }
    
        return null;
    }

    public checkUserCI(CI: number): Observable<boolean>{

      console.log(CI);
      return this._http.get<UserList>(`${ this._api_url }/user/list-all`).pipe(
        map(res => res.usuarios.some(user => user.ci === Number(CI)))
      );
    }

    public checkEmail(email: string): Observable<boolean> {
      return this._http.get<UserList>(`${ this._api_url }/user/list-all`).pipe(
        map(res => res.usuarios.some(user => user.email === email))
      );
    }

    public checkPhone(phone: string): Observable<boolean> {
      return this._http.get<UserList>(`${ this._api_url }/user/list-all`).pipe(
        map(res => res.usuarios.some(user => user.telefono === parseInt(phone)))
      );
    }
}