import { NgClass } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgClass
  ],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss'
})
export class InputComponent {
  public icon = input<boolean>(false);
  public type = input.required<string>();
  public placeholder = input<string>('search');
  public animationHover = input<boolean>(false);
  public value = output<string>();

  inputValue = new FormControl('');

  emitValue(): void {
    this.value.emit(this.inputValue.value!.toString().trim());
  }

}
