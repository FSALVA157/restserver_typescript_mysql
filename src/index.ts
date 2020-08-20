
import Server from './server/server';




async function main(){
    //puedo mandar o no un puerto como  parametro al init() si no le mando nada toma el puerto local 3000 o un puerto global
    const server = Server.init();
    
    
    
    //instancia de la clase conexion
    //MySQL.instance;
    
    await server.start((p: any) => {
        console.log(`Servidor corriendo en el puerto: ${p}`);
    });

}

main();