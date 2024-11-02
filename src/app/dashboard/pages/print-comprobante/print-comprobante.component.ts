import { Component, inject, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { MenuSuperiorComponent } from '../../shared/menu-superior/menu-superior.component';
import { SharedComprobanteComponent } from '../../shared/shared-comprobante/shared-comprobante.component';

@Component({
  selector: 'app-print-comprobante',
  standalone: true,
  imports: [
    MenuSuperiorComponent,
    SharedComprobanteComponent
  ],
  templateUrl: './print-comprobante.component.html',
  styleUrl: './print-comprobante.component.scss'
})
export class PrintComprobanteComponent implements OnInit {
  private readonly _router = inject(Router);

  ngOnInit(): void {
    this.scrollStart();
  }

  scrollStart(): void{
    this._router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => window.scrollTo(0, 0));
  }

  closeModal(): void {

  }

}
