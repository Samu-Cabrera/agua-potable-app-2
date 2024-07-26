import { TitleCasePipe } from '@angular/common';
import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [
    TitleCasePipe
  ],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {

  closeModal = output<void>();
  titleModal = input.required<string>();

  onCloseModal(): void {
    this.closeModal.emit();
  }

}
