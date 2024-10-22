import { Component, OnInit } from '@angular/core';
import { NgClass, TitleCasePipe } from '@angular/common';
import { MenuSuperiorComponent } from '../../shared/menu-superior/menu-superior.component';
import { RouterModule } from '@angular/router';

interface MenuItem {
  icon: string;
  title: string;
  link: string;
  active: boolean;
}

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    RouterModule,
    NgClass,
    TitleCasePipe,
    MenuSuperiorComponent
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
      link: 'dashboard',
      active: true
    },
    {
      icon: 'ri-file-list-2-line',
      title: 'Crear Factura',
      link: 'users',
      active: false
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

  itemActive(clickedItem: MenuItem) {
    this.menuItems.forEach(item => {
      item.active = (item === clickedItem);
    });
  }

}
