const express = require("express");
const { sql } = require("@vercel/postgres");

const router = express.Router();

router.get("/msg/:id", async (req, res) => {
  try {
    const { id } = req.params.id;
    const { rows, rowCount } =
      await sql`SELECT * FROM recordatorio WHERE recordatorio_id = ${id};`;

    if (rowCount === 0) {
      return res.status(404).json({ NotFound: rowCount });
    }
    return res.status(200).json({ rows: rows });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
});

router.delete("/msg/:id", async (req, res) => {
  try {
    const { id } = req.params.id;
    const { rows, rowCount } =
      await sql`DELETE FROM recordatorio WHERE recordatorio_id = ${id};`;

    if (rowCount === 0) {
      return res.status(404).json({ NotFound: rowCount });
    }
    return res.status(200).json({ success: rowCount });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
});

router.put("/msg/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const sms = req.body.recordatorio_msg;
    const { rows, rowCount } =
      await sql`UPDATE recordatorio SET recordatorio_msg = ${sms} WHERE recordatorio_id = ${id};`;

    if (rowCount == 0) {
      return res.status(404).json({ NotFound: rowCount });
    }
    return res.status(200).json({ success: rowCount });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
});

router.post("/msg/:cita_id", async (req, res) => {
  try {
    const cita_id = req.params.cita_id;
    const sms = req.body.recordatorio_msg;
    const { rows, rowCount } =
      await sql`INSERT INTO recordatorio VALUES (nextval('seqMsg'), ${cita_id}, ${sms});`;

    if (rowCount == 0) {
      return res.status(404).json({ NotFound: rowCount });
    }
    return res.status(200).json({ success: rowCount });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
});

router.get("/msg", async (req, res) => {
  try {
    const { rows, rowCount } = await sql`SELECT * FROM recordatorio;`;
    if (rowCount == 0) {
      return res.status(404).json({ NotFound: rowCount });
    }
    return res.status(200).json({ rows: rows });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
});

module.exports = router;
