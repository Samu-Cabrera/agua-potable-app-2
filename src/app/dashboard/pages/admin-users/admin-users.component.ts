import { Component, inject, OnInit } from '@angular/core';
import { DecimalPipe, NgClass, TitleCasePipe } from '@angular/common';
import { MenuSuperiorComponent } from '../../shared/menu-superior/menu-superior.component';
import { UsuariosService } from '../../services/usuarios.service';
import { Usuario } from '../../interfaces/usuarios.interface';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ModalComponent } from '../../../shared/modal/modal.component';

@Component({
  selector: 'admin-users',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgClass,
    TitleCasePipe,
    DecimalPipe,
    MenuSuperiorComponent,
    FormsModule,
    ModalComponent
  ],
  templateUrl: './admin-users.component.html',
  styleUrl: './admin-users.component.scss'
})
export class AdminUsersComponent implements OnInit {
  private readonly _userService = inject(UsuariosService);
  private readonly _fb = inject(FormBuilder);
  private _userIdActual!: string;
  public tableHead: string[] = ['ID', 'usuario', 'CI', 'dirección', 'estado', 'Acción'];
  private _users: Usuario[] = [];
  public usuariosFiltrados: Usuario[] = [];
  public filtroActual: string = 'activo';
  public openModal: boolean = false;

  public myForm: FormGroup = this._fb.group({
    nombre: ['', Validators.required],
    apellido: ['', Validators.required],
    direccion: ['', Validators.required],
    telefono: ['', Validators.required],
    email: ['', Validators.required],
  });

  
  public isValidField(field: string): boolean | null {
    return (
      this.myForm.controls[field].errors && this.myForm.controls[field].touched
    );
  }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this._userService.getUserAll().subscribe((response: any) => {
      this._users = response.usuarios;
      this.filterUser(this.filtroActual);
    });
  }

  filterUser(estado: string): void {
    this.filtroActual = estado;
    this.usuariosFiltrados = this._users.filter(u => u.estado.trim().toLowerCase() === estado.trim().toLowerCase());
  }

  deletUser(id: string): void {
    this._userService.deleteUser(id).subscribe(() => this.loadUsers());
  }

  activateUser(id: string): void {
    this._userService.activateUser(id).subscribe(() => this.loadUsers());
  }
  
  editUser(): void {
    const id = this._userIdActual;
    const formData = this.myForm.value;
    this._userService.updateUser(id, formData).subscribe(data => {
      this.loadUsers();
      this.openModal = false;
      this.myForm.reset();
    });
  }
  onOpenModal(id: string): void {
    this.openModal = true;
    this._userIdActual = id;
    this.setFormValue(id);
  }

  setFormValue(id: string): void {
    this._userService.getUserById(id).subscribe(res => {
      this.myForm.patchValue({
        nombre: res.nombre,
        apellido: res.apellido,
        direccion: res.direccion,
        telefono: res.telefono,
        email: res.email,
      });
    });
  }

  closeModal(event: any): void {
    this.openModal = false;
    this.loadUsers();
  }

}

