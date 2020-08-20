
// en este caso debo instalar:  npm i types/mysql2 -D
import mysql from 'mysql2';
//import {createPool} from 'mysql2/promise';

export async function connect(){
    const hiloConn = await mysql.createPool({
        host     : 'bgr6cvci0boxlqe1x4a7-mysql.services.clever-cloud.com',
        user     : 'uss4wi44oxovd872',
        password : 'Hm7LncSEszNuH8qmxRd7',
        database : 'bgr6cvci0boxlqe1x4a7',
        waitForConnections: true,
        connectionLimit: 1,
        queueLimit: 0
      });
    return hiloConn;
};

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