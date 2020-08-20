
//para que tome esta importacion tuve que instalar por consola 'npm install @types/express --save-dev'
import express from 'express';
import path from 'path';
//morgan sirve para que cuando un usuario visite mi servidor pueda ver las peticiones http
import morgan from 'morgan';
import IndexRoutes from '../router/index.routes';
import usersRoutes from '../router/users.routes';
import {Request,Response,NextFunction} from 'express';



export default class Server{
    public app: express.Application;
    //public port: number;

    constructor(private port?:number | string){
       // this.port = puerto;
        this.app = express();
        this.settings();
        this.middlewares();
        this.routes();
        this.errores();
    };

    settings(){
        this.app.set('port', this.port || process.env.PORT || 3000);
    }

    middlewares(){
        // coloco 'dev' porque seran mensajes de desarrollo por consola
        this.app.use(morgan('dev'));
        this.app.use(express.urlencoded({extended:false}));
        
    }

    //middlewares de rutas
    routes(){
        this.app.use(IndexRoutes);
        this.app.use('/users',usersRoutes);
    }

    //midlleware de errores
     errores(){
        this.app.use( (err:Error,req:Request,res:Response,next:NextFunction)=>{
            
                res.status(400).json({
                    status: 'error',
                    message: 'Error Capturado en el Middleware: ' + err.message
                });
            
    });
}
    
    //el init parece estar demas?? optimizar
    static init(puerto?: number | string){
        return new Server(puerto);
    };

    private publicFolder(){
        const publicPath = path.resolve(__dirname,'../public');
        this.app.use(express.static(publicPath));
    };

    async start(callback : Function){
        const puertoActivo = this.app.get('port');
        //await?
        this.app.listen(puertoActivo,callback(puertoActivo));
        this.publicFolder();
    };

};


