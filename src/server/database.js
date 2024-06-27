
const pg = require('pg')
const { Pool } = pg;

const dotenv = require("dotenv").config();

const POSTGRES_URL=process.env.POSTGRES_URL;
const pool = new Pool({
  connectionString: POSTGRES_URL,
})

pool.connect()
.then(() => console.log("Conexion a Base Datos PostgreSQL Exitosa"))
.catch((err) => console.log("Error en la conexion en la Base Datos: " + err))

  


  module.exports = pool;