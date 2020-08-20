import { User } from '../interfaces/user.interface';


export class Usuario implements User{
    id?: number | undefined;
    nombre: string;
    apellido: string;
    email: string;
    password: string;
    nick: string;
    
    constructor(nom:string,apel:string,mail:string,pass:string,nickName:string){
        this.nombre = nom;
        this.apellido = apel;
        this.email = mail;
        this.password = pass;
        this.nick = nickName;
    }
}