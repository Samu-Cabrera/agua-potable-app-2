import { NgClass, TitleCasePipe } from '@angular/common';
import { Component, input, output, computed, effect, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { InputComponent } from '../input/input.component';

interface TableRow {
  id: string;
  comprobante: boolean;
  ci: number;
  avatar: string;
  name: string;
  address: string;
  lectura: string;
  status: string;
}

export interface TableAction {
  label: string;
  icon: string;
  color?: string;
  action?: (item: any) => void;
  routerLink?: string;
  routerLink2?: string;
}

@Component({
  selector: 'shared-table',
  standalone: true,
  imports: [
    FormsModule,
    RouterModule,
    NgClass,
    TitleCasePipe,
    InputComponent
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent {
  tableData = input.required<TableRow[]>();
  actions = input<TableAction[]>();
  searchTerm = signal('');
  public inputValue = output<string>();

  filteredData = computed(() => {
    const term = this.searchTerm().toLowerCase();
    return this.tableData().filter(row => 
      Object.values(row).join(' ').toLowerCase().includes(term)
    );
  });

  constructor() {
    effect(() => {
      this.applyAnimation();
    });
  }

  applyAnimation() {
    setTimeout(() => {
      this.filteredData().forEach((row, i) => {
        const element = document.querySelector(`tbody tr:nth-child(${i + 1})`) as HTMLElement;
        if (element) {
          element.style.setProperty('--delay', `${i / 25}s`);
          element.classList.remove('hide');
          void element.offsetWidth; // Trigger reflow
          element.classList.add('show');
        }
      });
    }, 0);
  }

  onValueInput(value: string): void {
    this.searchTerm.set(value);
    this.inputValue.emit(value);
  }
}


