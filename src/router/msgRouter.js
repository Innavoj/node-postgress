const express = require("express");
const { sql } = require("@vercel/postgres");

const router = express.Router();

router.get("/msg/:id", async (req, res) => {
  try {
    const { id } = req.params.id;
    const { rows, rowCount } =
      await sql`SELECT * FROM recordatorio WHERE recordatorio_id = ${id};`;
    // res.send(req.params)
    if (rowCount === 0) {
      return res.send("No existe el Id buscado");
    }
    return res.json(rows);
  } catch (error) {
    console.log("Error en la API: " + error);
  }
});

router.delete("/msg/:id", async (req, res) => {
  try {
    const { id } = req.params.id;
    const { rows, rowCount } =
      await sql`DELETE FROM recordatorio WHERE recordatorio_id = ${id};`;
    // res.send(req.params)
    if (rowCount === 0) {
      return res.send("No existe el ID a borrar");
    }
    return res.send(rows);
  } catch (error) {
    console.log("Error en la API: " + error);
  }
});

router.put("/msg/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const sms = req.body.recordatorio_msg ;

    const { rows, rowCount } =
      await sql`UPDATE recordatorio SET recordatorio_msg = ${sms} WHERE recordatorio_id = ${id};`;
    // res.send(req.params)
    if (rowCount == 0) {
      return res.status(500).send("Error al Update en la Tabla Recordatorio");
    }
    return res.status(200).send(" Actualizado correctamente el Id:" + id );
  } catch (error) {
    console.log("Error en la API: " + error);
  }
});

router.post("/msg/:cita_id", async (req, res) => {
  try {
    const cita_id = req.params.cita_id;
    const sms = req.body.recordatorio_msg;

    const { rows, rowCount } =
      await sql`INSERT INTO recordatorio VALUES (nextval('seqMsg'), ${cita_id}, ${sms});`;
    // res.send(req.params)
    if (rowCount == 0) {
      return res.status(500).send("Error al Insertar en la Tabla Recordatorio");
    }
    return res.status(200).json(rows);
  } catch (error) {
    console.log("Error en la API: " + error);
  }
});

router.get("/msg", async (req, res) => {
  try {
    const { rows, rowCount } = await sql`SELECT * FROM recordatorio;`;
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