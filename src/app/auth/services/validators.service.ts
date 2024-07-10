import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core'
import { FormGroup } from '@angular/forms' 
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ValidatorsServices {
    
  private readonly _http = inject(HttpClient);

    //es valido el formulario
    public isValidField(form: FormGroup, field: string): boolean | null {
        return form.controls[field].errors && form.controls[field].touched;
    }

    public getFieldError(form: FormGroup, field: string): string | null {
        if(!form.controls[field]) return null;
    
        const errors = form.controls[field].errors || {};
    
        for(let keys of Object.keys(errors)) {
          switch(keys){
            case 'required': return field === 'cedula' ? 'La cédula es obligatoria.' : 'La contraseña es obligatoria.'
            case 'minLength': return `Este campo debe tener más de 5 caracteres.`;
            case 'maxLength': return 'Este campo debe tener menos de 15 caracteres.';
            case 'existeCI': return 'La cédula ya esta registrada.';
          }
        }
    
        return null;
    }

    public checkUserCI(CI: string): Observable<boolean>{
      const api_url = 'https://jsonplaceholder.typicode.com/users';
      
      return this._http.get<any[]>(api_url).pipe(
        map(users => users.some(user => user.username === CI))
      );
    }
}