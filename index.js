const express = require("express");
const app = express();
//const router = express.Router();
const dotenv = require("dotenv");
require ('./src/server/database');
const apiEntidad  = require('./src/router/entidadRouter');
const apiAnimal = require('./src/router/animalRouter');
const apiPropietario = require('./src/router/propietarioRouter');
const apiConsulta = require('./src/router/consultaRouter');
const apiArchivo = require('./src/router/archivoRouter');
const apiCita = require('./src/router/citaRouter');
const apiMsg = require('./src/router/msgRouter');
const apiFactura = require('./src/router/facturaRouter');

const bodyParser = require('body-parser');
app.use(bodyParser.json({ extends: false}));

app.use('/api', apiEntidad);
app.use('/api', apiAnimal);
app.use('/api', apiPropietario);
app.use('/api', apiConsulta);
app.use('/api', apiArchivo);
app.use('/api', apiCita);
app.use('/api', apiMsg);
app.use('/api', apiFactura);

app.use(express.json());



const PORT = process.env.PORT;
app.listen(PORT, () =>  console.log('Servidor WEB Conectado en el puerto ', PORT ));

app.get("/", (req, res) => {
    res.send("Servidor esta Ejecutandose");
  });


//module.exports = router;
module.exports = dotenv;