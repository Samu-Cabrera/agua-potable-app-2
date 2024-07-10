import { Component, Input } from '@angular/core';

@Component({
  selector: 'shared-input',
  standalone: true,
  imports: [],
  templateUrl: './shared-input.component.html',
  styleUrl: './shared-input.component.scss'
})
export class SharedInputComponent {

  @Input() placeholder: string = '';
  @Input() typeInput: string = '';

}
