export interface Lectura {
    ok?:              boolean;
    msg?:             string;
    consumoActual:    number;
    diferenciaEnDias: number;
    ultimaLectura:    UltimaLectura;
}

export interface UltimaLectura {
    _id?:          string;
    userID:       string | null;
    lectura:      number;
    limite:       number;
    fechaLectura: Date;
    fechaLimite:  Date;
    createdAt?:    Date;
    updatedAt?:    Date;
}
