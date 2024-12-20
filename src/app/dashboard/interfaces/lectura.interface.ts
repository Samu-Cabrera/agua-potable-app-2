export interface Lectura {
    ok:               boolean;
    consumoActual:    number;
    diferenciaEnDias: number;
    ultimaLectura:    UltimaLectura;
}

export interface UltimaLectura {
    _id:          string;
    userID:       string;
    lectura:      number;
    limite:       number;
    fechaLectura: Date;
    fechaLimite:  Date;
    createdAt:    Date;
    updatedAt:    Date;
}
