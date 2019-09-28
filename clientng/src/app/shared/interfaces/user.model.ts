export class User {
    userid: number;
    nombre: string;
    apellidos: string;
    pais: string;
    provincia: string;
    domicilio: string;
    cPostal: number;
    mail: string;
    tel: number;
    password: string;
    password2: string;
}

export class Credenciales {
    mail: string;
    password: string;
}

export class UseryToken {
    user: User;
    token: string;
}
