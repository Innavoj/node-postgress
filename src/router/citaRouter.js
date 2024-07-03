const express = require("express");
const { sql } = require("@vercel/postgres");

const router = express.Router();

router.get("/cita/:id", async (req, res) => {
  try {
    const { id } = req.params.id;
    const { rows, rowCount } =
      await sql`SELECT * FROM cita WHERE cita_id  = ${id};`;
    if (rowCount === 0) {
      return res.status(404).json({ status: 'NotFound' });
    }
    return res.status(200).json({ rows: rows });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
});

router.delete("/cita/:id", async (req, res) => {
  try {
    const { id } = req.params.id;
    const { rows, rowCount } =
      await sql`DELETE FROM cita WHERE cita_id  = ${id};`;

    if (rowCount === 0) {
      return res.status(404).json({ status: 'NotFound' });
    }
    return res.status(200).json({ status: 'success' });
  } catch (error) {
    return res.status(500).json({ error: error });
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

    if (rowCount == 0) {
      return res.status(404).json({ status: 'NotFound' });
    }
    return res.status(200).json({ status: 'success' });
  } catch (error) {
    return res.status(500).json({ error: error });
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

    if (rowCount == 0) {
      return res.status(404).json({ status: 'NotFound' });
    }
    return res.status(200).json({ status: 'success' });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
});

router.get("/cita", async (req, res) => {
  try {
    const { rows, rowCount } = await sql`SELECT * FROM cita;`;
    if (rowCount == 0) {
      return res.status(404).json({ status: 'NotFound' });
    }
    return res.status(200).json({ rows: rows });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
});

module.exports = router;
