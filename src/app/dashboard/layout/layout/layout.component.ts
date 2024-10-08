import { Component } from '@angular/core';
import { MenuSuperiorComponent } from '../../shared/menu-superior/menu-superior.component';
import { NgClass, TitleCasePipe } from '@angular/common';

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
    MenuSuperiorComponent,
    NgClass,
    TitleCasePipe
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {
  public openSidebar: boolean = false;
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
      link: 'dashboard',
      active: false
    }
  ]

  toggleSidebar(){
    this.openSidebar ? this.openSidebar = false : this.openSidebar = true;
  }

  itemActive(clickedItem: MenuItem) {
    this.menuItems.forEach(item => {
      item.active = (item === clickedItem);
    });
  }

}
