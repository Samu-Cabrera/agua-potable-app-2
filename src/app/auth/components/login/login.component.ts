import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, AsyncValidator } from '@angular/forms';
import { minValidators, maxValidators, userCIValidators } from '../../helpers/custom.validation';
import { ValidatorsServices } from '../../services/validators.service';

@Component({
  selector: 'auth-login',
  standalone: true,
  imports: [
    RouterModule,
    ReactiveFormsModule,
    NgClass
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  loginForm: FormGroup = this.fb.group({
    cedula: ['', [
      Validators.required,
      minValidators,
      maxValidators,
    ], [
      userCIValidators(this.validatorService)
    ]],
    password: ['112445', [
      Validators.required,
      minValidators
    ]]
  });

  constructor(
    private fb: FormBuilder, 
    private validatorService: ValidatorsServices,
  ){}

  isValidField(field: string): boolean | null {
    return this.validatorService.isValidField(this.loginForm, field);
  }

  getError(field: string): string | null {
    return this.validatorService.getFieldError(this.loginForm, field);
  }

  onSubmit(): void {
    userCIValidators(this.loginForm.controls['cedula'].value);
    if(this.loginForm.invalid) return;
  }
}
