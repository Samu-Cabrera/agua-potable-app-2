import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { minValidators, maxValidators, userCIValidators } from '../../helpers/custom.validation';
import { ValidatorsServices } from '../../services/validators.service';
import { UserServices } from '../../services/user.service';

@Component({
  selector: 'auth-login',
  standalone: true,
  imports: [ RouterModule, ReactiveFormsModule, NgClass
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  private readonly _fb = inject(FormBuilder);
  private readonly _router = inject(Router);
  private readonly _validatorService = inject(ValidatorsServices);
  private readonly _userService = inject(UserServices);

  loginForm: FormGroup = this._fb.group({
    ci: ['', [
      Validators.required,
      minValidators,
      maxValidators,
    ], [
      userCIValidators(this._validatorService)
    ]],
    password: ['', [
      Validators.required,
      minValidators
    ]]
  });

  isValidField(field: string): boolean | null {
    return this._validatorService.isValidField(this.loginForm, field);
  }

  getError(field: string): string | null {
    return this._validatorService.getFieldError(this.loginForm, field);
  }

  onSubmit(): void {
    if(this.loginForm.invalid) return;
    
    this._userService.login(this.loginForm.value).subscribe(res => {
      return res.ok ? this._router.navigateByUrl('/') : res.msg;
    });
  }
}
