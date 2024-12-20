import { Injectable } from "@angular/core";
import { FormGroup } from "@angular/forms";

@Injectable({
    providedIn: 'root'
})
export class ValidatorService {
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
}