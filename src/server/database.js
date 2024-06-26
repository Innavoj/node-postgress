
const pg = require('pg')
const { Pool } = pg;

const dotenv = require("dotenv").config();

const POSTGRES_URL="postgres://default:H1jp5KRkXDMe@ep-twilight-recipe-a27ok8ra-pooler.eu-central-1.aws.neon.tech:5432/verceldb?sslmode=require"

const pool = new Pool({
  connectionString: POSTGRES_URL,
})

pool.connect()
.then(() => console.log("Conexion a Base Datos PostgreSQL Exitosa"))
.catch((err) => console.log("Error en la conexion en la Base Datos: " + err))

  


  module.exports = pool;