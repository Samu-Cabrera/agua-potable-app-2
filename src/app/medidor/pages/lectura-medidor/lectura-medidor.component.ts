import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { UserService } from '../../services/user.service';
import { JsonPipe } from '@angular/common';
import { User } from '../../interfaces/user.interface';

@Component({
  selector: 'lectura-medidor',
  standalone: true,
  imports: [
    JsonPipe
  ],
  templateUrl: './lectura-medidor.component.html',
  styleUrl: './lectura-medidor.component.scss'
})
export class LecturaMedidorComponent implements OnInit {

  public user?: User;
  private readonly _activatedRouter = inject(ActivatedRoute);
  private readonly _router = inject(Router);
  private readonly _userService = inject(UserService);

  ngOnInit(): void {
    this._activatedRouter.params.pipe(
      switchMap(({ id }) => this._userService.getUserById(id))
    ).subscribe(res => {
      if(!res) return this._router.navigate(['medidor/users']);
      this.user = res;
      return;
    });
  }
}
