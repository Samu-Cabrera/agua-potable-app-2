import { Component, inject } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Card } from "../../../Interfaces/card.interface";
import { CardComponent } from "../../../components/card/card.component";
import { switchMap } from "rxjs";
import { ReciboService } from "../../../services/recibo.service";
import { Recibo } from "../../../Interfaces/recibo.interface";
import { ModalComponent } from "../../../../shared/modal/modal.component";
import { ReciboComponent } from "../../../components/recibo/recibo.component";

@Component({
  selector: "app-recibos",
  standalone: true,
  imports: [
    CardComponent,
    ModalComponent,
    ReciboComponent
  ],
  templateUrl: "./recibos.component.html",
  styleUrl: "./recibos.component.scss",
})
export class RecibosComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly _reciboService = inject(ReciboService);
  private _recibo!: Recibo[];
  public reciboDetails!: Recibo;
  public userId!: string;
  public cardData!: Card[];
  public modal = false;

  ngOnInit() {
    this.route.parent?.params
      .pipe(switchMap(({ id }) => this._reciboService.getReciboByUserId(id)))
      .subscribe((res) => {
        this.loadRecibos(res);
        this._recibo = res;
      });
  }

  loadRecibos(recibo: Recibo[]): void {
    this.cardData = recibo.map((recibo) => ({
      id: recibo._id,
      nro: recibo.nroRecibo,
      estado: recibo.estado ? 'Pagado' : 'Pendiente',
      total: recibo.importe,
      fecha: recibo.fechaEmision.toString(),
    }));
  }

  closeModal(event: any) {
    this.modal = false;
  }

  openModal(id: string, nro: number): void {
    this.modal = true;
    const recibo = this._recibo.find(r => r._id === id && r.nroRecibo === nro);
    this.reciboDetails = recibo!;
  }
}
