import { Component, input, output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'shared-input',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './shared-input.component.html',
  styleUrl: './shared-input.component.scss'
})
export class SharedInputComponent {

  public type = input.required<string>();
  public pleaceholder = input.required<string>();
  public inputValue = output<string>();
  public inputValueChanges = output<string>();
  public valueControl = new FormControl('');
  
  emitInputValue(): void {
    this.inputValue.emit(this.valueControl.value!.toString().trim());
  }

  emitValueChanges(): void {
    this.inputValueChanges.emit(this.valueControl.value!.toString().trim());
  }
}
