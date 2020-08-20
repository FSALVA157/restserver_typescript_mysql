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
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = exports.deleteUser = exports.getUserById = exports.createUser = exports.getUsers = void 0;
const mysql_1 = require("../mysql/mysql");
const user_model_1 = require("../models/user.model");
const users_validations_1 = require("../validations/users.validations");
const user_validation_error_1 = require("../models/user.validation.error");
function getUsers(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const conn = yield mysql_1.connect();
        const promiseConn = conn.promise();
        const usersList = yield promiseConn.query('SELECT * FROM usuarios');
        return res.json(usersList[0]);
    });
}
exports.getUsers = getUsers;
;
function createUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield users_validations_1.createUserValidation(req.body).catch((err) => {
                console.log('PASANDO POR CATCH DE PROMESA VALIDATION');
                throw err;
            });
            const datos = req.body;
            //const conn  = await connect();
            let newUser = new user_model_1.Usuario(datos.nombre, datos.apellido, datos.email, datos.password, datos.nick);
            try {
                const conn = yield mysql_1.connect();
                const promiseConn = conn.promise();
                yield promiseConn.query('INSERT INTO usuarios SET ?', [newUser]);
                res.json({
                    message: 'Usuario agregado',
                });
            }
            catch (error) {
                //console.log('ESTOY DENTRO DEL ERROR DE LA CONSULTA');
                // throw new Error('FALLO DESDE LA BASE DE DATOS!!');
                throw error;
            }
        }
        catch (error) {
            if (error.path) {
                const ve = res.status(400).json(new user_validation_error_1.ValidationError(error.name, error.message, error.path, 400).toJson());
            }
            else {
                res.status(500).json(new user_validation_error_1.ValidationError(error.name, error.message, error.path, 500).toJson());
            }
        }
    });
}
exports.createUser = createUser;
;
function getUserById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const idUser = req.params.id;
            const conn = yield mysql_1.connect();
            const promiseConn = conn.promise();
            const usersList = yield promiseConn.query('SELECT * FROM usuarios WHERE id = ?', [idUser]);
            return res.json(usersList[0]);
        }
        catch (error) {
            if (error.path) {
                const ve = res.status(400).json(new user_validation_error_1.ValidationError(error.name, error.message, error.path, 400).toJson());
            }
            else {
                res.status(500).json(new user_validation_error_1.ValidationError(error.name, error.message, error.path, 500).toJson());
            }
        }
    });
}
exports.getUserById = getUserById;
function deleteUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const idUser = req.params.id;
            const conn = yield mysql_1.connect();
            const promiseConn = conn.promise();
            //verificar cuando lo hace y cuando no
            yield promiseConn.query('DELETE FROM usuarios WHERE id = ?', [idUser]);
            return res.json({
                message: 'Usuario Eliminado con Exito'
            });
        }
        catch (error) {
            if (error.path) {
                const ve = res.status(400).json(new user_validation_error_1.ValidationError(error.name, error.message, error.path, 400).toJson());
            }
            else {
                res.status(500).json(new user_validation_error_1.ValidationError(error.name, error.message, error.path, 500).toJson());
            }
        }
    });
}
exports.deleteUser = deleteUser;
function updateUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield users_validations_1.createUserValidation(req.body).catch((err) => {
                console.log('PASANDO POR CATCH DE PROMESA VALIDATION');
                throw err;
            });
            const idUser = req.params.id;
            const datos = req.body;
            //const conn  = await connect();
            let newUser = new user_model_1.Usuario(datos.nombre, datos.apellido, datos.email, datos.password, datos.nick);
            try {
                const conn = yield mysql_1.connect();
                const promiseConn = conn.promise();
                yield promiseConn.query('UPDATE usuarios SET ? WHERE id=?', [newUser, idUser]);
                res.json({
                    message: 'Datos Actualizados con Exito',
                });
            }
            catch (error) {
                throw error;
            }
        }
        catch (error) {
            if (error.path) {
                const ve = res.status(400).json(new user_validation_error_1.ValidationError(error.name, error.message, error.path, 400).toJson());
            }
            else {
                res.status(500).json(new user_validation_error_1.ValidationError(error.name, error.message, error.path, 500).toJson());
            }
        }
    });
}
exports.updateUser = updateUser;
