
const pg = require('pg')
const { Pool } = pg;

const dotenv = require("dotenv").config();

 
const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
})

pool.connect()
.then(() => console.log("Conexion a Base Datos PostgreSQL Exitosa"))
.catch((err) => console.log("Error en la conexion a la Base Datos: " + err))

  
  module.exports = pool;