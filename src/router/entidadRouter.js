const express = require("express");
const { sql } = require("@vercel/postgres");

const router = express.Router();

router.get("/entidad/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { rows, rowCount } =
      await sql`SELECT * FROM veterinaria WHERE veterinaria_id = ${id};`;

    if (rowCount === 0) {
      return res.status(404).json({ NotFound: rowCount });
    }
    return res.status(200).json({ rows: rows });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
});

router.delete("/entidad/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { rows, rowCount } =
      await sql`DELETE FROM veterinaria WHERE veterinaria_id = ${id};`;

    if (rowCount === 0) {
      return res.status(404).json({ NotFound: rowCount });
    }
    return res.status(200).json({ success: rowCount });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
});

router.put("/entidad/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const nombre = req.body.veterinaria_nombre;
    const telefono = req.body.veterinaria_telefono;
    const direccion = req.body.veterinaria_direccion;
    const { rows, rowCount } =
      await sql`UPDATE veterinaria SET veterinaria_nombre = ${nombre}, veterinaria_telefono = ${telefono}, veterinaria_direccion = ${direccion} WHERE veterinaria_id = ${id};`;

    if (rowCount == 0) {
      return res.status(404).json({ NotFound: rowCount });
    }
    return res.status(200).json({ success: rowCount });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
});

router.post("/entidad", async (req, res) => {
  try {
    const nombre = req.body.veterinaria_nombre;
    const telefono = req.body.veterinaria_telefono;
    const direccion = req.body.veterinaria_direccion;
    const { rows, rowCount } =
      await sql`INSERT INTO veterinaria VALUES (nextval('seqVeterinaria'), ${nombre}, ${telefono}, ${direccion});`;

    if (rowCount == 0) {
      return res.status(404).json({ NotFound: rowCount });
    }
    return res.status(200).json({ success: rowCount });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
});

router.get("/entidad", async (req, res) => {
  try {
    const { rows, rowCount } = await sql`SELECT * FROM veterinaria;`;
    if (rowCount == 0) {
      return res.status(404).json({ NotFound: rowCount });
    }
    return res.status(200).json({ rows: rows });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
});

module.exports = router;
