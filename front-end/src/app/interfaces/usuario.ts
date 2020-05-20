export interface Usuario {
    id: string;
    nome: string;
    email: string;
    celular: string;
    password: string;
    codeRFID: string;
    token: string;
    emailConfirmed: boolean;
    foto: string;
}