import { Component, OnInit } from '@angular/core';
import { NgClass, TitleCasePipe } from '@angular/common';
import { MenuSuperiorComponent } from '../../shared/menu-superior/menu-superior.component';
import { RouterLink, RouterModule } from '@angular/router';

interface MenuItem {
  icon: string;
  title: string;
  link: string;
}

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    RouterModule,
    RouterLink,
    NgClass,
    TitleCasePipe
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent implements OnInit {
  public openSidebar: boolean = false;
  public openSidebarValue?: any;
  public itemIsActive: boolean = false;

  public menuItems: MenuItem[] = [
    {
      icon: 'ri-home-line',
      title: 'home',
      link: 'home'
    },
    {
      icon: 'ri-file-list-2-line',
      title: 'Crear Factura',
      link: 'users'
    },
    {
      icon: 'ri-file-chart-line',
      title: 'Historial',
      link: 'historial'
    },
    {
      icon: 'ri-notification-2-line',
      title: 'Notificaciones',
      link: 'notificaciones'
    },
    {
      icon: 'ri-pie-chart-line',
      title: 'Estadísticas',
      link: 'estadistica/finanza'
    },
    {
      icon: 'ri-exchange-dollar-fill',
      title: 'Transacciones',
      link: 'transacciones'
    }
  ]

  ngOnInit(): void {
    const storedValue = localStorage.getItem('openSidebar');
    this.openSidebar = storedValue ? JSON.parse(storedValue) : false;
  }

  toggleSidebar(){
    this.openSidebar ? this.openSidebar = false : this.openSidebar = true;
    localStorage.setItem('openSidebar', JSON.stringify(this.openSidebar));
  }

}
