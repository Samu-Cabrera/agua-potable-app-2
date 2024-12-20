import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { MenuSuperiorComponent } from '../../shared/menu-superior/menu-superior.component';
import { TableComponent } from '../../shared/table/table.component';
import { Usuarios } from '../../interfaces/usuarios.interface';
import { UsuariosService } from '../../services/usuarios.service';
import { Lectura } from '../../interfaces/lectura.interface';
import { LecturaService } from '../../services/lectura.service';
import { map, tap } from 'rxjs';

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
}

@Component({
  selector: 'app-historial',
  standalone: true,
  imports: [
    MenuSuperiorComponent,
    TableComponent
  ],
  templateUrl: './historial.component.html',
  styleUrl: './historial.component.scss'
})
export class HistorialComponent implements OnInit {
  private readonly _userService = inject(UsuariosService);
  private readonly _lecturaService = inject(LecturaService);
  private readonly _cdr = inject(ChangeDetectorRef);
  private _user!: Usuarios;
  private _lectura!: Lectura;
  public tableData: TableRow[] = [];

  actions: TableAction[] = [
    {
      label: 'Historial',
      icon: 'ri-file-list-line',
      routerLink: '/dashboard/historial/'
    }
  ];

  ngOnInit(): void {
    this.userData();
  }

  userData(): void {
    this._userService.getUsuarios().subscribe(user => {
      this._user = user;
      this.getLecturaById(user.usuarios[0]._id);
    });
  }

  getLecturaById(id: string): void {
    this._lecturaService.getLecturaById(id).subscribe(lectura => {
      this._lectura = lectura;
      this.updateTableData(this._user.usuarios);
    });
  }

  updateTableData(usuarios: any[]): void {
    this.tableData = usuarios.map(user => ({
      id: user._id,
      comprobante: true,
      ci: user.ci,
      avatar: user.imagen,
      name: `${user.nombre} ${user.apellido}`,
      address: user.direccion,
      lectura: this._lectura?.consumoActual?.toString() || 'N/A',
      status: user.estado ? 'activo' : 'inactivo',
    }));
    this._cdr.detectChanges();

  }

  onSearch(value: string) {
    this._userService.getUsuarios().pipe(
      map(({ usuarios }) => usuarios),
      map(usuarios => usuarios.filter(usuario => 
        usuario.nombre.toLowerCase().includes(value.toLowerCase()) || 
        usuario.apellido.toLowerCase().includes(value.toLowerCase())
      )),
      tap(filteredUsuarios => {
        this._user = {
          ok: true,
          total: filteredUsuarios.length,
          usuarios: filteredUsuarios
        };
        this.updateTableData(filteredUsuarios);
      })
    ).subscribe();
  }


}
