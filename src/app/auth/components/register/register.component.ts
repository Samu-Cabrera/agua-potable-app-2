import { NgClass, TitleCasePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ValidatorsServices } from '../../services/validators.service';
import { existEmail, existUserCI, maxValidators, minValidators } from '../../helpers/custom.validation';

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

  constructor(){
    console.log(this.registerForm.valid);
  }

  selectIndex: number = 0;
  selectItem: number = 0;
  opcionValue: string = 'Medidor';
  btnShow: boolean = false;

  registerForm: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
    lastname: ['', [Validators.required]],
    cedula: ['', [
      Validators.required,
      minValidators,
      maxValidators
    ], [
      existUserCI(this.validatorService)
    ]],
    address: ['', Validators.required],
    phone: ['', [ 
      Validators.required,
      minValidators
    ]],
    medidor: [''],
    email: ['', [
      Validators.required,
      Validators.email
    ], [existEmail(this.validatorService)]],
    password: ['', [
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
    console.log(this.registerForm.valid);
  }
}
