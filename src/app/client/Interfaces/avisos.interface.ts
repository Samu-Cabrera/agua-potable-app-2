export interface Aviso {
    _id:        string;
    mensaje:    string;
    usuario:    Usuario;
    leido:      boolean;
    respuestas: any[];
    createdAt:  Date;
    updatedAt:  Date;
}

export interface Usuario {
    _id:       string;
    nombre:    string;
    apellido:  string;
    direccion: string;
    imagen:    string;
}
