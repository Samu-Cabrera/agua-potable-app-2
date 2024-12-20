export interface Factura {
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
    fecha:    Date;
    cantidad: number;
    iva:      number;
    precio:   number;
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
    estado:    boolean;
    roles:     string[];
    imagen:    string;
    createdAt: Date;
    updatedAt: Date;
    __v:       number;
}
