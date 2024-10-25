import { NgClass, TitleCasePipe } from '@angular/common';
import { Component, inject, input, output } from '@angular/core';
import { Router } from '@angular/router';
import { switchMap, timer } from 'rxjs';

@Component({
  selector: 'shared-button',
  standalone: true,
  imports: [
    NgClass,
    TitleCasePipe
  ],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {
  private readonly _router = inject(Router);
  public loading: boolean = false;
  public finish: boolean = false;
  public time = input<number>(1000);
  public clicked = output();
  public urlRedirect = input<string>();
  public buttonText = input<string>();
  public buttonIcon = input<string>();

  onSave(): void {
    this.clicked.emit();
    this.loading = true;

    timer(this.time())
    .pipe(
      switchMap(() => {
        this.finish = true;
        return timer(500);
      })
    ).subscribe(() => this._router.navigateByUrl(`${ this.urlRedirect() }`));
  }
}
