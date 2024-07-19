import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TitleCasePipe } from '@angular/common';
import { switchMap } from 'rxjs/operators';
import { UserService } from '../../services/user.service';
import { User } from '../../interfaces/user.interface';
import { PhotoPipe } from '../../pipes/photo.pipe';
import { UserPhotoComponent } from "../../components/user-photo/user-photo.component";
import { SharedInputComponent } from '../../../shared/shared-input/shared-input.component';
import { CircleProgressComponent } from '../../../shared/circle-progress/circle-progress.component';

@Component({
  selector: 'lectura-medidor',
  standalone: true,
  imports: [
    RouterLink,
    TitleCasePipe,
    PhotoPipe,
    UserPhotoComponent,
    SharedInputComponent,
    CircleProgressComponent
],
  templateUrl: './lectura-medidor.component.html',
  styleUrl: './lectura-medidor.component.scss'
})
export class LecturaMedidorComponent implements OnInit {

  public user?: User;
  private readonly _activatedRouter = inject(ActivatedRoute);
  private readonly _router = inject(Router);
  private readonly _userService = inject(UserService);

  public valueProgress: number = 15000;
  public limitProgress: number = 15000;

  ngOnInit(): void {
    this._activatedRouter.params.pipe(
      switchMap(({ id }) => this._userService.getUserById(id))
    ).subscribe(res => {
      if(!res) return this._router.navigate(['medidor/users']);
      this.user = res;
      return;
    });
  }

  onBack(): void {
    this._router.navigate(['/medidor/users']);
  }

  haddleValue(value: string): void {
    console.log(value);
  }
}
