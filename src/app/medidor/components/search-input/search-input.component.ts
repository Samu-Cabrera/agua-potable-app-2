import { Component, Input } from '@angular/core';

@Component({
  selector: 'search-input',
  standalone: true,
  imports: [],
  templateUrl: './search-input.component.html',
  styleUrl: './search-input.component.scss'
})
export class SearchInputComponent {
  @Input() placeholder: string = 'Search...';
  @Input() type: string = 'text';

}
