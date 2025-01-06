import { TitleCasePipe } from '@angular/common';
import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-historial',
  standalone: true,
  imports: [
    RouterModule,
    TitleCasePipe
  ],
  templateUrl: './historial.component.html',
  styleUrl: './historial.component.scss'
})
export class HistorialComponent implements OnInit, OnDestroy {
  private readonly _activatedRoute = inject(ActivatedRoute);
  public userId!: string;
  public menu: any[] = [];
  private paramSubscription!: Subscription;

  ngOnInit(): void {
    this.paramSubscription = this._activatedRoute.paramMap.subscribe(params => {
      this.userId = params.get('id')!;
      this.updateMenu();
    });
  }

  ngOnDestroy(): void {
    if (this.paramSubscription) {
      this.paramSubscription.unsubscribe();
    }
  }

  private updateMenu(): void {
    this.menu = [
      { title: 'Facturas', class: 'title', link: `/client/historial/${this.userId}/facturas` },
      { title: 'Recibos', class: 'title', link: `/client/historial/${this.userId}/recibos` },
    ];
  }
}