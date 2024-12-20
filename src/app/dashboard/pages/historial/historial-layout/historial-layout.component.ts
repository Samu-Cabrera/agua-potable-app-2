import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FilterService } from '../../../services/filter.service';
import { UsuariosService } from '../../../services/usuarios.service';
import { map } from 'rxjs';
import { DatePipe, TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-historial-layout',
  standalone: true,
  imports: [
    RouterModule,
    DatePipe,
    TitleCasePipe
  ],
  templateUrl: './historial-layout.component.html',
  styleUrl: './historial-layout.component.scss'
})
export class HistorialLayoutComponent implements OnInit{
  private readonly _router = inject(Router);
  private readonly _activatedRoute = inject(ActivatedRoute);
  private readonly _filterService = inject(FilterService);
  private readonly _userService = inject(UsuariosService);

  public userId!: string;
  public userFullName!: string;
  public today: Date = new Date();
  public dropdownOpen: string | null = null;
  public selectedYear: number | null = null;
  public availableYears = [2022, 2023, 2024];

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe(paramMap => {
      const userId = paramMap.get('userId'); 
      if (userId) {
        this.userId = userId;
        this.getUser(userId);
        const urlComplete = `/dashboard/historial/${ userId }/comprobantes`;
        this._router.navigateByUrl(urlComplete);
      }
    });
  }

  getUser(id: string): void {
    this._userService.getUsuarios().pipe(
      map(usuario => usuario.usuarios),
      map(usuarios => usuarios.find(usuario => usuario._id === id))
    ).subscribe(user => {
      if(user){
        this.userFullName = `${ user.nombre } ${ user.apellido }`;
      }
    });
  }

  toggleDropdown(type: 'year' | 'month'): void {
    this.dropdownOpen = this.dropdownOpen === type ? null : type;
  }

  filterByYear(year: number): void {
    this.selectedYear = year;
    this.dropdownOpen = null;
    this._filterService.setYearFilter(year);
  }
    
}
