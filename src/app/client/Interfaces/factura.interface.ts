export interface Factura {
    ok:      boolean;
    factura: FacturaElement[];
}

export interface FacturaElement {
    consumo:          Consumo;
    _id:              string;
    userID:           UserID;
    nroFactura:       number;
    fechaEmision:     Date;
    fechaVencimiento: Date;
    cuentaTotal:      number;
    estadoPago:       boolean;
    createdAt:        Date;
    updatedAt:        Date;
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
    telefono:  number;
    medidor:   string;
    email:     string;
    password:  string;
    estado:    string;
    roles:     string[];
    imagen:    string;
    createdAt: Date;
    updatedAt: Date;
    __v:       number;
}
