const express = require("express");
const { sql } = require("@vercel/postgres");

const router = express.Router();

router.get("/cita/:id", async (req, res) => {
  try {
    const { id } = req.params.id;
    const { rows, rowCount } =
      await sql`SELECT * FROM cita WHERE cita_id  = ${id};`;
    // res.send(req.params)
    if (rowCount === 0) {
      return res.send("No existe el Id buscado");
    }
    return res.json(rows);
  } catch (error) {
    console.log("Error en la API: " + error);
  }
});

router.delete("/cita/:id", async (req, res) => {
  try {
    const { id } = req.params.id;
    const { rows, rowCount } =
      await sql`DELETE FROM cita WHERE cita_id  = ${id};`;
    // res.send(req.params)
    if (rowCount === 0) {
      return res.send("No existe el ID a borrar");
    }
    return res.status(200).json('Success');
  } catch (error) {
    console.log("Error en la API: " + error);
  }
});

router.put("/cita/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const fecha = req.body.cita_fecha;
    const cancelado = req.body.cita_cancelado;
    const recordatorio = req.body.cita_recordatorio;

    const { rows, rowCount } =
      await sql`UPDATE cita SET cita_fecha = ${fecha}, cita_cancelado = ${cancelado}, cita_recordatorio = ${recordatorio} WHERE cita_id = ${id};`;
    // res.send(req.params)
    if (rowCount == 0) {
      return res.status(500).send("Error al Update en la Tabla Cita");
    }
    return res.status(200).json('Success');
  } catch (error) {
    console.log("Error en la API: " + error);
  }
});

router.post("/cita/:propietario_id", async (req, res) => {
  try {
    const propietario_id = req.params.propietario_id;
    const fecha = req.body.cita_fecha;
    const cancelado = req.body.cita_cancelado;
    const recordatorio = req.body.cita_recordatorio;
    const { rows, rowCount } =
      await sql`INSERT INTO cita VALUES (nextval('seqCita'), ${propietario_id}, ${fecha}, ${cancelado}, ${recordatorio});`;
    // res.send(req.params)
    if (rowCount == 0) {
      return res.status(500).send("Error al Insertar en la Tabla Cita");
    }
    return res.status(200).json('Success');
  } catch (error) {
    console.log("Error en la API: " + error);
  }
});

router.get("/cita", async (req, res) => {
  try {
    const { rows, rowCount } = await sql`SELECT * FROM cita;`;
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