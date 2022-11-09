import { ApolloServer } from "apollo-server-express"
import "reflect-metadata"
import {StartServer} from './app'
import {connect} from './config/typeorm'
import { logger } from "./utils/Loogerr";



async function main() {
    
    connect();
    const port = 2016
    const appres = await StartServer();
    appres.listen(port)
    logger.debug(`Servidor Iniciado ${port}`)
}

main()

// const mariadb = require('mariadb');

// const pool = mariadb.createPool({
//      host: 'localhost', 
//      user:'root', 
//      password: 'tiopazhc',
//      connectionLimit: 5,
//      database:'sys'

// });

// async function asyncFunction() {
    // console.log("Iniciando")
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
// console.log("Se connecto")