const express = require("express");
const { sql } = require("@vercel/postgres");

const router = express.Router();

router.get("/animal/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { rows, rowCount } =
      await sql`SELECT * FROM animal WHERE animal_id = ${id};`;
    if (rowCount === 0) {
      return res.status(404).json({ NotFound: rowCount });
    }
    return res.status(200).json({ rows: rows });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
});

router.delete("/animal/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { rows, rowCount } =
      await sql`DELETE FROM animal WHERE animal_id = ${id};`;
    if (rowCount === 0) {
      return res.status(404).json({ NotFound: rowCount });
    }
    return res.status(200).json({ success: rowCount });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
});

router.put("/animal/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const historia = req.body.animal_historia;
    const nombre = req.body.animal_nombre;
    const especie = req.body.animal_especie;
    const raza = req.body.animal_raza;
    const edad = req.body.animal_edad;
    const caracter = req.body.animal_caracter;
    const { rows, rowCount } =
      await sql`UPDATE animal SET animal_historia = ${historia}, animal_nombre = ${nombre}, animal_especie = ${especie}, animal_raza = ${raza}, animal_edad = ${edad}, animal_caracter = ${caracter} WHERE animal_id = ${id};`;

    if (rowCount == 0) {
      return res.status(404).json({ NotFound: rowCount });
    }
    return res.status(200).json({ success: rowCount });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
});

router.post("/animal/:propietario_id", async (req, res) => {
  try {
    const propietario_id = req.params.propietario_id;
    const historia = req.body.animal_historia;
    const nombre = req.body.animal_nombre;
    const especie = req.body.animal_especie;
    const raza = req.body.animal_raza;
    const edad = req.body.animal_edad;
    const caracter = req.body.animal_caracter;
    const { rows, rowCount } =
      await sql`INSERT INTO animal VALUES (nextval('seqAnimal'), ${propietario_id}, ${historia}, ${nombre}, ${especie}, ${raza}, ${edad}, ${caracter});`;

    if (rowCount == 0) {
      return res.status(404).json({ NotFound: rowCount });
    }
    return res.status(200).json({ success: rowCount });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
});

router.get("/animal", async (req, res) => {
  try {
    const { rows, rowCount } = await sql`SELECT * FROM animal;`;
    if (rowCount == 0) {
      return res.status(404).json({ NotFound: rowCount });
    }
    return res.status(200).json({ rows: rows });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
});

module.exports = router;
