"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Usuario = void 0;
class Usuario {
    constructor(nom, apel, mail, pass, nickName) {
        this.nombre = nom;
        this.apellido = apel;
        this.email = mail;
        this.password = pass;
        this.nick = nickName;
    }
}
exports.Usuario = Usuario;
