import {  AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { ValidatorsServices } from '../services/validators.service';
import { Observable, of, timer } from 'rxjs';
import { catchError,  map, switchMap } from 'rxjs/operators';

export const minValidators = (field: AbstractControl): ValidationErrors | null => {
    if(!field.value) return null;

    if(field.value.toString().length < 5) {
        return { minLength: true };
    }

    return null;
}

export const maxValidators = (field: AbstractControl): ValidationErrors | null => {
    if(!field.value) return null;

    if(field.value.toString().length > 15) {
        return { maxLength: true };
    }

    return null;
}

export const userCIValidators = (existeCI: ValidatorsServices): AsyncValidatorFn => {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
        return timer(1000).pipe(
            switchMap(() => existeCI.checkUserCI(control.value.toString())),
            map(ci => ci ? null : { existeCI: true}),
            catchError(() => of(null))
        );
    };
}

export const existUserCI = (userCI: ValidatorsServices): AsyncValidatorFn => {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
        return timer(1000).pipe(
            switchMap(() => userCI.checkUserCI(control.value.toString())),
            map(ci => ci ? { userCI: true } : null),
            catchError(() => of(null))
        )
    }
}

export const existEmail = (email: ValidatorsServices): AsyncValidatorFn => {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
        return timer(1000).pipe(
            switchMap(() => email.checkEmail(control.value.trim())),
            map(userEmail => userEmail ? { existEmail: true } : null),
            catchError(() => of(null))
        )
    } 
}

export const existPhone = (phone: ValidatorsServices): AsyncValidatorFn => {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
        return timer(1000).pipe(
            switchMap(() => phone.checkPhone(control.value)),
            map(phone => phone ? { existPhone: true } : null),
            catchError(() => of(null))
        )
    } 
}

