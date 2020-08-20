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
const server_1 = __importDefault(require("./server/server"));
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        //puedo mandar o no un puerto como  parametro al init() si no le mando nada toma el puerto local 3000 o un puerto global
        const server = server_1.default.init();
        //instancia de la clase conexion
        //MySQL.instance;
        yield server.start((p) => {
            console.log(`Servidor corriendo en el puerto: ${p}`);
        });
    });
}
main();
