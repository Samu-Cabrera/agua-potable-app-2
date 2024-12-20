export interface Card {
    id: string;
    userId: string;
    title: string;
    fecha?: Date;
    nro: number;
    consumo: number;
    monto: number;
    urlTitle: string;
}