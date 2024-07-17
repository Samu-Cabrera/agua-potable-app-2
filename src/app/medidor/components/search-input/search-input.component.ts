import { map } from 'rxjs/operators';
import { Component, inject, Input, output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Usuario } from '../../interfaces/user.interface';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'search-input',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './search-input.component.html',
  styleUrl: './search-input.component.scss'
})
export class SearchInputComponent {
  @Input() placeholder: string = 'Search...';
  @Input() type: string = 'text';

  public userFoud = output<Usuario[]>();

  public _userService = inject(UserService);
  public inputValue = new FormControl('');

  search(): void {
    this._userService.getUser().pipe(
      map(({usuarios}) => usuarios),
      map(usuarios => usuarios.filter(user => user.nombre.toLowerCase().includes(this.inputValue.value!.toLowerCase().trim())))
    ).subscribe(user => this.userFoud.emit(user));
  }
  
}
