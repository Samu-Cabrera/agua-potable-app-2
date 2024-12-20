export interface Aviso {
    _id:        string;
    mensaje:    string;
    usuario:    Usuario;
    respuestas: Respuesta[];
    createdAt:  Date;
    updatedAt:  Date;
    leido:      boolean;
}

export interface Respuesta {
    mensaje:   string;
    usuario:   Usuario;
    _id:       string;
    createdAt: Date;
    updatedAt: Date;
}

export interface Usuario {
    _id:       string;
    nombre:    string;
    apellido:  string;
    direccion: string;
    imagen:    string;
}
