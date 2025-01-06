import { DatePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { AvisoService } from '../../services/aviso.service';
import { Aviso } from '../../Interfaces/avisos.interface';

@Component({
  selector: 'app-aviso',
  standalone: true,
  imports: [
    DatePipe
  ],
  templateUrl: './aviso.component.html',
  styleUrl: './aviso.component.scss'
})
export class AvisoComponent implements OnInit {
  private readonly _avisoService = inject(AvisoService);

  public avisos!: Aviso[]; 

  ngOnInit(): void {
    this._avisoService.getAvisos().subscribe(aviso => this.avisos = aviso);
  }
}
