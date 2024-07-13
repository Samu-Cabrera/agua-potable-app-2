import { NgClass, TitleCasePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ValidatorsServices } from '../../services/validators.service';
import { existEmail, existPhone, existUserCI, maxValidators, minValidators } from '../../helpers/custom.validation';
import { UserServices } from '../../services/user.service';
import { delay } from 'rxjs';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ NgClass, TitleCasePipe, ReactiveFormsModule ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  private readonly validatorService = inject(ValidatorsServices);
  private readonly fb = inject(FormBuilder);
  private readonly _userService = inject(UserServices);
  private readonly _router = inject(Router)

  constructor(){
    console.log(this.registerForm.valid);
  }

  selectIndex: number = 0;
  selectItem: number = 0;
  opcionValue: string = 'Medidor';
  btnShow: boolean = false;

  registerForm: FormGroup = this.fb.group({
    nombre: ['test1', [Validators.required]],
    apellido: ['test1', [Validators.required]],
    ci: ['111111', [
      Validators.required,
      minValidators,
      maxValidators
    ], [
      existUserCI(this.validatorService)
    ]],
    direccion: ['Coronel bogado', Validators.required],
    telefono: ['', [ 
      Validators.required,
      minValidators
    ], [
      existPhone(this.validatorService)
    ]],
    medidor: [''],
    email: ['test1@gmail.com', [
      Validators.required,
      Validators.email
    ], [existEmail(this.validatorService)]],
    password: ['111111', [
      Validators.required,
      minValidators
    ]]
  });

  isValidField(field: string): boolean | null {
    return this.validatorService.isValidField(this.registerForm, field);
  }

  getError(field: string): string | null {
    return this.validatorService.getFieldError(this.registerForm, field);
  }


  //metodos
  onNextCard(): void {
    this.selectIndex++;

  }

  onPrevCard(): void {
    this.selectIndex--;
  }

  onClickItem1(): void {
    this.selectItem = 0;
    this.opcionValue = 'Analógico';
    this.btnShow = false;

  }

  onClickItem2(): void {
    this.selectItem = 1;
    this.opcionValue = 'Digital';
    this.btnShow = false;

  }

  showBtn(): void {
    this.btnShow = true;
  }

  hideBtn(): void {
    this.btnShow = false;
  }

  onSave(): void {

    if(this.registerForm.invalid) return;

    this._userService.register(this.registerForm.value).pipe(
      delay(2000)
    ).subscribe(res => {
      if(res.ok) return this._router.navigateByUrl('/');

      return;

    });

  }
  
}
