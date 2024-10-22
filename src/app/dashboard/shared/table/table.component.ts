import { NgClass, TitleCasePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { InputComponent } from '../input/input.component';

interface TableRow {
  id: number;
  comprobante: boolean;
  ci: number;
  avatar: string;
  name: string;
  address: string;
  lectura: string;
  status: 'activo' | 'inactivo';
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
export class TableComponent  {

  searchTerm: string = '';
  tableData: TableRow[] = [
    {
      id: 1,
      comprobante: true,
      ci: 1234567,
      avatar: 'https://res.cloudinary.com/die4hw70e/image/upload/v1728483693/samu-img/user_avatar_sirmyv.jpg',
      name: 'Juan Pérez',
      address: 'Av. Principal 123, Asunción',
      lectura: '1234 kWh',
      status: 'activo'
    },
    {
      id: 2,
      comprobante: false,
      ci: 2345678,
      avatar: 'https://res.cloudinary.com/die4hw70e/image/upload/v1728483693/samu-img/user_avatar_sirmyv.jpg',
      name: 'María González',
      address: 'Calle 7 de Junio 456, San Lorenzo',
      lectura: '987 kWh',
      status: 'inactivo'
    },
    {
      id: 3,
      comprobante: true,
      ci: 3456789,
      avatar: 'https://res.cloudinary.com/die4hw70e/image/upload/v1728483693/samu-img/user_avatar_sirmyv.jpg',
      name: 'Carlos Rodríguez',
      address: 'Ruta 1 km 15, Capiatá',
      lectura: '2345 kWh',
      status: 'activo'
    },
    {
      id: 4,
      comprobante: true,
      ci: 4567890,
      avatar: 'https://res.cloudinary.com/die4hw70e/image/upload/v1728483693/samu-img/user_avatar_sirmyv.jpg',
      name: 'Ana Martínez',
      address: 'Barrio San Miguel, Fernando de la Mora',
      lectura: '876 kWh',
      status: 'activo'
    },
    {
      id: 5,
      comprobante: false,
      ci: 5678901,
      avatar: 'https://res.cloudinary.com/die4hw70e/image/upload/v1728483693/samu-img/user_avatar_sirmyv.jpg',
      name: 'Luis Gómez',
      address: 'Calle Mcal. Estigarribia 789, Luque',
      lectura: '1567 kWh',
      status: 'inactivo'
    },
    {
      id: 6,
      comprobante: true,
      ci: 6789012,
      avatar: 'https://res.cloudinary.com/die4hw70e/image/upload/v1728483693/samu-img/user_avatar_sirmyv.jpg',
      name: 'Laura Sánchez',
      address: 'Av. Mariscal López 234, Asunción',
      lectura: '2109 kWh',
      status: 'activo'
    },
    {
      id: 7,
      comprobante: false,
      ci: 7890123,
      avatar: 'https://res.cloudinary.com/die4hw70e/image/upload/v1728483693/samu-img/user_avatar_sirmyv.jpg',
      name: 'Roberto Benítez',
      address: 'Calle Independencia 567, Lambaré',
      lectura: '654 kWh',
      status: 'inactivo'
    },
    {
      id: 8,
      comprobante: true,
      ci: 8901234,
      avatar: 'https://res.cloudinary.com/die4hw70e/image/upload/v1728483693/samu-img/user_avatar_sirmyv.jpg',
      name: 'Sofía Acosta',
      address: 'Av. Eusebio Ayala 890, Asunción',
      lectura: '1876 kWh',
      status: 'activo'
    },
    {
      id: 9,
      comprobante: true,
      ci: 9012345,
      avatar: 'https://res.cloudinary.com/die4hw70e/image/upload/v1728483693/samu-img/user_avatar_sirmyv.jpg',
      name: 'Diego Fernández',
      address: 'Calle España 123, Ciudad del Este',
      lectura: '2398 kWh',
      status: 'activo'
    },
    {
      id: 10,
      comprobante: false,
      ci: 123456,
      avatar: 'https://res.cloudinary.com/die4hw70e/image/upload/v1728483693/samu-img/user_avatar_sirmyv.jpg',
      name: 'Patricia Villalba',
      address: 'Av. Mcal. Estigarribia 456, Encarnación',
      lectura: '765 kWh',
      status: 'inactivo'
    }
  ];

  searchTable() {
    const searchTerm = this.searchTerm.toLowerCase();
    this.tableData.forEach((row, i) => {
      const tableData = Object.values(row).join(' ').toLowerCase();
      const element = document.querySelector(`tbody tr:nth-child(${i + 1})`) as HTMLElement;
      if (element) {
        element.classList.toggle('hide', tableData.indexOf(searchTerm) < 0);
        element.style.setProperty('--delay', `${i / 25}s`);
      }
    });
  }

}
