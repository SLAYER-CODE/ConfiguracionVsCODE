import {createConnection} from 'typeorm'
import path from 'path'

// const mariadb = require('mariadb');



// async function asyncFunction() {
//     console.log("Iniciando")
//   let conn;
//   try {
// 	conn = await pool.getConnection();
// 	const rows = await conn.query("SELECT * from sys_config;");
//     console.log("SE CONECTO A LA BASE DE DATOS ")
// 	console.log(rows); //[ {val: 1}, meta: ... ]
// 	// const res = await conn.query("INSERT INTO myTable value (?, ?)", [1, "mariadb"]);
// 	// console.log(res); // { affectedRows: 1, insertId: 1, warningStatus: 0 }

//   } catch (err) {
// 	throw err;
//   } finally {
// 	if (conn) return conn.end();
//   }
// }

// asyncFunction()



import * as admin from 'firebase-admin';
import { ServerApp } from '../utils/Inspectors';
import { logger } from '../utils/Loogerr';


var serviceAccount = require("../path/keyjson.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

logger.info("Se esta iniciando la conexion a la base de datos ")
logger.debug("Connectando...")
export async function connect(){
    await createConnection({
        type:'mssql',
        host:'localhost',
        username:'SA',
        password:'CRtefrAQ3cgF6',
        database:'Tienda',
        dropSchema: false,
        logging: true,
        entities:[
            path.join(__dirname,'../entity/**/**.ts')
        ],
        synchronize:true,
        
    });
    logger.debug("Database Conectado")

//     const pool = mariadb.createPool({
//         host: 'localhost', 
//         user:'root', 
//         password: 'tiopazhc',
//         connectionLimit: 5,
//         database:'sys'
   
//    });

//    let conn;
//     try {
//         conn = await pool.getConnection();
//         const rows = await conn.query("SELECT * from sys_config;");
//         console.log("SE CONECTO A LA BASE DE DATOS ")
//         console.log(rows); //[ {val: 1}, meta: ... ]
//         // const res = await conn.query("INSERT INTO myTable value (?, ?)", [1, "mariadb"]);
//         // console.log(res); // { affectedRows: 1, insertId: 1, warningStatus: 0 }

//     } catch (err) {
//         throw err;
//     } finally {
//         if (conn) return conn.end();
//   }


}