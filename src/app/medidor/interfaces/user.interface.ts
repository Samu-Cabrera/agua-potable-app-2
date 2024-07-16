export interface UserList {
    ok:       boolean;
    total:    number;
    usuarios: Usuario[];
}

export interface Usuario {
    _id:       string;
    nombre:    string;
    apellido:  string;
    ci:        number;
    direccion: string;
    telefono:  number;
    medidor:   string;
    email:     string;
    estado:    boolean;
    roles:     Role[];
    imagen:    string;
    createdAt: Date;
    updatedAt: Date;
}

export interface Role {
    _id:    string;
    nombre: string;
}
