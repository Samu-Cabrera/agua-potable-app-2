import { Component, input, OnInit, output } from '@angular/core';
import { NgClass } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputForm } from '../../interfaces/input-form.interfaces';

@Component({
  selector: 'aviso-form',
  standalone: true,
  imports: [
    NgClass,
    ReactiveFormsModule
  ],
  templateUrl: './aviso-form.component.html',
  styleUrl: './aviso-form.component.scss'
})
export class AvisoFormComponent implements OnInit {
  public titleForm = input.required<string>();
  public inputItem = input<InputForm[]>();
  public formSumit = output<any>();

  public form!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({});
  }

  ngOnInit(): void {
    for (const field of this.inputItem()!) {
      this.form.addControl(
        field.name,
        this.fb.control(
          field.defaultValue || '', 
          field.required ? [Validators.required] : []
        )
      );
    }
  }
  
  onSubmit(): void {
    if (this.form.valid) {
      this.formSumit.emit(this.form.value);
      this.form.reset('');
    } else {
      console.error('Formulario inválido');
    }
  }
    
}
