const express = require("express");
const { sql } = require("@vercel/postgres");

const router = express.Router();

router.get("/consulta/:id", async (req, res) => {
  try {
    const { id } = req.params.id;
    const { rows, rowCount } =
      await sql`SELECT * FROM consulta WHERE consulta_id  = ${id};`;

    if (rowCount === 0) {
      return res.status(404).json({ status: 'NotFound' });
    }
    return res.status(200).json({ rows: rows });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
});

router.delete("/consulta/:id", async (req, res) => {
  try {
    const { id } = req.params.id;
    const { rows, rowCount } =
      await sql`DELETE FROM consulta WHERE consulta_id  = ${id};`;

    if (rowCount === 0) {
      return res.status(404).json({ status: 'NotFound' });
    }
    return res.status(200).json({ status: 'success' });
  } catch (error) {
    return res.status(500).json({ error: error });
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

    if (rowCount == 0) {
      return res.status(404).json({ status: 'NotFound' });
    }
    return res.status(200).json({ status: 'success' });
  } catch (error) {
    return res.status(500).json({ error: error });
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

    if (rowCount == 0) {
      return res.status(404).json({ status: 'NotFound' });
    }
    return res.status(200).json({ status: 'success' });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
});

router.get("/consulta", async (req, res) => {
  try {
    const { rows, rowCount } = await sql`SELECT * FROM consulta;`;
    if (rowCount == 0) {
      return res.status(404).json({ status: 'NotFound' });
    }
    return res.status(200).json({ rows: rows });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
});

module.exports = router;
