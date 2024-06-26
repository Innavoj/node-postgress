const express = require("express");
const app = express();
//const router = express.Router();
const dotenv = require("dotenv");
require ('./server/database');
const apiEntidad  = require('./router/entidadRouter');
const apiAnimal = require('./router/animalRouter');
const apiPropietario = require('./router/propietarioRouter');
const apiConsulta = require('./router/consultaRouter');
const apiArchivo = require('./router/archivoRouter');
const apiCita = require('./router/citaRouter');
const apiMsg = require('./router/msgRouter');
const apiFactura = require('./router/facturaRouter');

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



const PORT = process.env.PORT || 3001;
app.listen(PORT, () =>  console.log('Servidor WEB Conectado en el puerto ', PORT ));

app.get("/", (req, res) => {
    res.send("Servidor esta Ejecutandose");
  });


//module.exports = router;
module.exports = dotenv;