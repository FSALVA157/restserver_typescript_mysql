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
//para que tome esta importacion tuve que instalar por consola 'npm install @types/express --save-dev'
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
//morgan sirve para que cuando un usuario visite mi servidor pueda ver las peticiones http
const morgan_1 = __importDefault(require("morgan"));
const index_routes_1 = __importDefault(require("../router/index.routes"));
const users_routes_1 = __importDefault(require("../router/users.routes"));
class Server {
    //public port: number;
    constructor(port) {
        this.port = port;
        // this.port = puerto;
        this.app = express_1.default();
        this.settings();
        this.middlewares();
        this.routes();
        this.errores();
    }
    ;
    settings() {
        this.app.set('port', this.port || process.env.PORT || 3000);
    }
    middlewares() {
        // coloco 'dev' porque seran mensajes de desarrollo por consola
        this.app.use(morgan_1.default('dev'));
        this.app.use(express_1.default.urlencoded({ extended: false }));
    }
    //middlewares de rutas
    routes() {
        this.app.use(index_routes_1.default);
        this.app.use('/users', users_routes_1.default);
    }
    //midlleware de errores
    errores() {
        this.app.use((err, req, res, next) => {
            res.status(400).json({
                status: 'error',
                message: 'Error Capturado en el Middleware: ' + err.message
            });
        });
    }
    //el init parece estar demas?? optimizar
    static init(puerto) {
        return new Server(puerto);
    }
    ;
    publicFolder() {
        const publicPath = path_1.default.resolve(__dirname, '../public');
        this.app.use(express_1.default.static(publicPath));
    }
    ;
    start(callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const puertoActivo = this.app.get('port');
            //await?
            this.app.listen(puertoActivo, callback(puertoActivo));
            this.publicFolder();
        });
    }
    ;
}
exports.default = Server;
;
