export interface Recibo {
    _id:          string;
    nroRecibo:    number;
    userID:       UserID;
    facturas:     Factura[];
    servicio:     string;
    formaPago:    string;
    importe:      number;
    tesorero:     string;
    fechaEmision: Date;
    estado:       string;
    total:        number;
    createdAt:    Date;
    updatedAt:    Date;
}

export interface Factura {
    consumo:          Consumo;
    _id:              string;
    userID:           string;
    nroFactura:       number;
    fechaEmision:     Date;
    fechaVencimiento: Date;
    cuentaTotal:      number;
    estadoPago:       boolean;
    createdAt:        Date;
    updatedAt:        Date;
    __v:              number;
}

export interface Consumo {
    cantidad: number;
    iva:      number;
    precio:   number;
    fecha:    Date;
}

export interface UserID {
    _id:       string;
    nombre:    string;
    apellido:  string;
    ci:        number;
    direccion: string;
}
