const express = require("express");
const { sql } = require("@vercel/postgres");

const router = express.Router();

router.get("/propietario/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { rows, rowCount } =
      await sql`SELECT * FROM propietario WHERE propietario_id  = ${id};`;

    if (rowCount === 0) {
      return res.status(404).json({ status: 'NotFound' });
    }
    return res.status(200).json({ rows: rows });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
});

router.delete("/propietario/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { rows, rowCount } =
      await sql`DELETE FROM propietario WHERE propietario_id  = ${id};`;
    // res.send(req.params)
    if (rowCount === 0) {
      return res.status(404).json({ status: 'NotFound' });
    }
    return res.status(200).json({ status: 'success' });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
});

router.put("/propietario/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const identidad = req.body.propietario_identidad;
    const nombre1 = req.body.propietario_nombre1;
    const nombre2 = req.body.propietario_nombre2;
    const apell1 = req.body.propietario_apell1;
    const apell2 = req.body.propietario_apell2;
    const telefono = req.body.propietario_telefono;
    const email = req.body.propietario_email;
    const { rows, rowCount } =
      await sql`UPDATE propietario SET propietario_identidad = ${identidad}, propietario_nombre1 = ${nombre1}, propietario_nombre2 = ${nombre2}, propietario_apell1 = ${apell1}, propietario_apell2 = ${apell2}, propietario_telefono = ${telefono}, propietario_email = ${email} WHERE propietario_id = ${id};`;

    if (rowCount == 0) {
      return res.status(404).json({ status: 'NotFound' });
    }
    return res.status(200).json({ status: 'success' });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
});

router.post("/propietario", async (req, res) => {
  try {
    const identidad = req.body.propietario_identidad;
    const nombre1 = req.body.propietario_nombre1;
    const nombre2 = req.body.propietario_nombre2;
    const apell1 = req.body.propietario_apell1;
    const apell2 = req.body.propietario_apell2;
    const telefono = req.body.propietario_telefono;
    const email = req.body.propietario_email;
    const { rows, rowCount } =
      await sql`INSERT INTO propietario VALUES (nextval('seqPropi'), ${identidad}, ${nombre1}, ${nombre2}, ${apell1}, ${apell2}, ${telefono}, ${email});`;

    if (rowCount == 0) {
      return res.status(404).json({ status: 'NotFound' });
    }
    return res.status(200).json({ status: 'success' });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
});

router.get("/propietario", async (req, res) => {
  try {
    const { rows, rowCount } = await sql`SELECT * FROM propietario;`;
    if (rowCount == 0) {
      return res.status(404).json({ status: 'NotFound' });
    }
    return res.status(200).json({ rows: rows });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
});

module.exports = router;
