const express = require("express");
const { sql } = require("@vercel/postgres");

const router = express.Router();

router.get("/archivo/:id", async (req, res) => {
  try {
    const { id } = req.params.id;
    const { rows, rowCount } =
      await sql`SELECT * FROM archivo WHERE archivo_id  = ${id};`;
    if (rowCount === 0) {
      return res.status(404).json({ NotFound: rowCount });
    }
    return res.status(200).json({ rows: rows });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
});

router.delete("/archivo/:id", async (req, res) => {
  try {
    const { id } = req.params.id;
    const { rows, rowCount } =
      await sql`DELETE FROM archivo WHERE archivo_id  = ${id};`;
    if (rowCount === 0) {
      return res.status(404).json({ NotFound: rowCount });
    }
    return res.status(200).json({ success: rowCount });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
});

router.put("/archivo/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const radiografia = req.body.archivo_radiografia;
    const analisislab = req.body.archivo_analisislab;
    const informes = req.body.archivo_informes;
    const { rows, rowCount } =
      await sql`UPDATE archivo SET archivo_radiografia = ${radiografia}, archivo_analisislab = ${analisislab}, archivo_informes = ${informes} WHERE archivo_id = ${id};`;
    if (rowCount == 0) {
      return res.status(404).json({ NotFound: rowCount });
    }
    return res.status(200).json({ success: rowCount });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
});

router.post("/archivo/:consulta_id", async (req, res) => {
  try {
    const consulta_id = req.params.consulta_id;
    const radiografia = req.body.archivo_radiografia;
    const analisislab = req.body.archivo_analisislab;
    const informes = req.body.archivo_informes;
    const { rows, rowCount } =
      await sql`INSERT INTO archivo VALUES (nextval('seqArchivo'), ${consulta_id}, ${radiografia}, ${analisislab}, ${informes});`;

    if (rowCount == 0) {
      return res.status(404).json({ NotFound: rowCount });
    }
    return res.status(200).json({ success: rowCount });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
});

router.get("/archivo", async (req, res) => {
  try {
    const { rows, rowCount } = await sql`SELECT * FROM archivo;`;
    if (rowCount == 0) {
      return res.status(404).json({ NotFound: rowCount });
    }
    return res.status(200).json({ rows: rows });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
});

module.exports = router;
