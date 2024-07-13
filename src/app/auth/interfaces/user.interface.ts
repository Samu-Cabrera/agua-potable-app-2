export interface UserRegister {
    ok:           boolean;
    nuevoUsuario: User;
}

export interface User {
    nombre:    string;
    apellido:  string;
    ci:        number;
    direccion: string;
    telefono:  number;
    medidor?:   string;
    email:     string;
    password: string;
    estado?:    boolean;
    roles?:     string[];
    imagen?:    string;
}

export interface UserList {
    ok:       boolean;
    msg:      string;
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

export interface UserLogin {
    ci: number;
    password: string;
}

export interface UserLoginMsg {
    ok: boolean;
    msg: string;
    token: string;
}

