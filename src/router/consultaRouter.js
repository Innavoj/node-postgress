const express = require("express");
const { sql } = require("@vercel/postgres");

const router = express.Router();

router.get("/consulta/:id", async (req, res) => {
  try {
    const { id } = req.params.id;
    const { rows, rowCount } =
      await sql`SELECT * FROM consulta WHERE consulta_id  = ${id};`;
    // res.send(req.params)
    if (rowCount === 0) {
      return res.send("No existe el Id buscado");
    }
    return res.json(rows);
  } catch (error) {
    console.log("Error en la API: " + error);
  }
});

router.delete("/consulta/:id", async (req, res) => {
  try {
    const { id } = req.params.id;
    const { rows, rowCount } =
      await sql`DELETE FROM consulta WHERE consulta_id  = ${id};`;
    // res.send(req.params)
    if (rowCount === 0) {
      return res.send("No existe el ID a borrar");
    }
    return res.status(200).json('Success');
  } catch (error) {
    console.log("Error en la API: " + error);
  }
});

router.put("/consulta/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const enfermedad = req.body.consulta_enfermedad;
    const tratamiento = req.body.consulta_tratamiento;
    const vacunas = req.body.consulta_vacunas;
    const cirujias = req.body.consulta_cirujias;

    const { rows, rowCount } =
      await sql`UPDATE consulta SET consulta_enfermedad = ${enfermedad}, consulta_tratamiento = ${tratamiento}, consulta_vacunas = ${vacunas}, consulta_cirujias = ${cirujias} WHERE consulta_id = ${id};`;
    // res.send(req.params)
    if (rowCount == 0) {
      return res.status(500).send("Error al Update en la Tabla Consulta");
    }
    return res.status(200).json('Success');
  } catch (error) {
    console.log("Error en la API: " + error);
  }
});

router.post("/consulta/:animal_id", async (req, res) => {
  try {
    const animal_id = req.params.animal_id;
    const enfermedad = req.body.consulta_enfermedad;
    const tratamiento = req.body.consulta_tratamiento;
    const vacunas = req.body.consulta_vacunas;
    const cirujias = req.body.consulta_cirujias;
    const { rows, rowCount } =
      await sql`INSERT INTO consulta VALUES (nextval('seqConsulta'), ${animal_id}, ${enfermedad}, ${tratamiento}, ${vacunas}, ${cirujias});`;
    // res.send(req.params)
    if (rowCount == 0) {
      return res.status(500).send("Error al Insertar en la Tabla Consulta");
    }
    return res.status(200).json('Success');
  } catch (error) {
    console.log("Error en la API: " + error);
  }
});

router.get("/consulta", async (req, res) => {
  try {
    const { rows, rowCount } = await sql`SELECT * FROM consulta;`;
    if (rowCount == 0) {
        return res.status(400).send("No hay Datos a Mostrar");
      }
    res.status(200).json(rows);
    // console.log(rows)
  } catch (error) {
    res.status(500).send("Error en la API: " + error);
  }
});



module.exports = router;