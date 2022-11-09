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


var serviceAccount = require("../path/luemb-7c19e-firebase-adminsdk-xs7m8-f75d8b53ec.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
ServerApp.log("Iniciando!")


console.log("Connectando...")
export async function connect(){
    await createConnection({
        type:'mariadb',
        host:'localhost',
        port : 3306,
        username:'root',
        password:'tiopazhc',
        database:'Tienda',
        entities:[
            path.join(__dirname,'../entity/**/**.ts')
        ],
        synchronize:true
    });
    console.log("Database Conectado")

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