"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connect = void 0;
// en este caso debo instalar:  npm i types/mysql2 -D
const mysql2_1 = __importDefault(require("mysql2"));
//import {createPool} from 'mysql2/promise';
function connect() {
    return __awaiter(this, void 0, void 0, function* () {
        const hiloConn = yield mysql2_1.default.createPool({
            host: 'bgr6cvci0boxlqe1x4a7-mysql.services.clever-cloud.com',
            user: 'uss4wi44oxovd872',
            password: 'Hm7LncSEszNuH8qmxRd7',
            database: 'bgr6cvci0boxlqe1x4a7',
            waitForConnections: true,
            connectionLimit: 1,
            queueLimit: 0
        });
        return hiloConn;
    });
}
exports.connect = connect;
;
// export async function connect(){
//   const hiloConn = await mysql.createPool({
//       host     : 'localhost',
//       user     : 'node_user',
//       password : '123456',
//       database : 'node_db_users',
//       waitForConnections: true,
//       connectionLimit: 10,
//       queueLimit: 0
//     });
//   return hiloConn;
// };
