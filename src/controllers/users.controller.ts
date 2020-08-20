import {Request,Response} from 'express';
import { connect } from '../mysql/mysql';
import { Usuario } from '../models/user.model';
import { createUserValidation } from '../validations/users.validations';
import {ValidationError} from '../models/user.validation.error';
import path from 'path';


export async function getUsers(req : Request,res : Response): Promise<Response> {

         const conn = await connect();
         const promiseConn = conn.promise();
        const usersList = await promiseConn.query('SELECT * FROM usuarios');
        return res.json(usersList[0]);
};

export async function createUser(req:Request,res:Response){
    
 try{
            await createUserValidation(req.body).catch((err)=>{
                console.log('PASANDO POR CATCH DE PROMESA VALIDATION');
                 throw err;
                });
    
    const datos = req.body;
    //const conn  = await connect();
    let newUser = new Usuario(
        datos.nombre,
        datos.apellido,
        datos.email,
        datos.password,
        datos.nick
    );
    try {
        const conn = await connect();
        const promiseConn = conn.promise();
        await promiseConn.query('INSERT INTO usuarios SET ?',[newUser]);
        res.json({
            message: 'Usuario agregado',
            //datos
        });
        
    } catch (error) {
       //console.log('ESTOY DENTRO DEL ERROR DE LA CONSULTA');
      // throw new Error('FALLO DESDE LA BASE DE DATOS!!');
       throw error;
       
    }
     
    
    } catch (error) {
        
        if(error.path){
            const ve = 
            res.status(400).json(new ValidationError( error.name,error.message,error.path,400).toJson());
         }else{
            res.status(500).json(new ValidationError( error.name,error.message,error.path,500).toJson());
        }

    
    }
};

export async function getUserById(req:Request,res:Response){
    try {
        const idUser = req.params.id;
        const conn = await connect();
         const promiseConn = conn.promise();
        const usersList = await promiseConn.query('SELECT * FROM usuarios WHERE id = ?',[idUser]);
        return res.json(usersList[0]);
    } catch (error) {
        if(error.path){
            const ve = 
            res.status(400).json(new ValidationError( error.name,error.message,error.path,400).toJson());
         }else{
            res.status(500).json(new ValidationError( error.name,error.message,error.path,500).toJson());
        }
    }
}

export async function deleteUser(req:Request,res:Response){
    try {
        const idUser = req.params.id;
        const conn = await connect();
        const promiseConn = conn.promise();
        //verificar cuando lo hace y cuando no
        await promiseConn.query('DELETE FROM usuarios WHERE id = ?',[idUser]);
        return res.json({
            message:'Usuario Eliminado con Exito'
        });
    } catch (error) {
        if(error.path){
            const ve = 
            res.status(400).json(new ValidationError( error.name,error.message,error.path,400).toJson());
         }else{
            res.status(500).json(new ValidationError( error.name,error.message,error.path,500).toJson());
        }
    }
}

export async function updateUser(req:Request,res:Response){
    try{
            await createUserValidation(req.body).catch((err)=>{
            console.log('PASANDO POR CATCH DE PROMESA VALIDATION');
             throw err;
            });
            const idUser = req.params.id;
            const datos = req.body;
            //const conn  = await connect();
            let newUser = new Usuario(
                datos.nombre,
                datos.apellido,
                datos.email,
                datos.password,
                datos.nick
            );
            try {
                const conn = await connect();
                const promiseConn = conn.promise();
                await promiseConn.query('UPDATE usuarios SET ? WHERE id=?',[newUser, idUser],);
                res.json({
                    message: 'Datos Actualizados con Exito',
                    //datos
                });
                
            } catch (error) {
                   throw error;
            
            }
                        
     } catch (error) {
        if(error.path){
            const ve = 
            res.status(400).json(new ValidationError( error.name,error.message,error.path,400).toJson());
         }else{
            res.status(500).json(new ValidationError( error.name,error.message,error.path,500).toJson());
        }
            }
}

