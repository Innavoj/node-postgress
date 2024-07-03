const express = require("express");
const { sql } = require("@vercel/postgres");

const router = express.Router();

router.get("/factura/:id", async (req, res) => {
  try {
    const { id } = req.params.id;
    const { rows, rowCount } =
      await sql`SELECT * FROM facturacion WHERE factura_id = ${id};`;
    if (rowCount === 0) {
      return res.status(404).json({ status: 'NotFound' });
    }
    return res.status(200).json({ rows: rows });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
});

router.delete("/factura/:id", async (req, res) => {
  try {
    const { id } = req.params.id;
    const { rows, rowCount } =
      await sql`DELETE FROM facturacion WHERE factura_id = ${id};`;
    if (rowCount === 0) {
      return res.status(404).json({ status: 'NotFound' });
    }
    return res.status(200).json({ status: 'success' });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
});

router.put("/factura/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const formapago = req.body.factura_formapago;
    const precio = req.body.factura_precio;
    const { rows, rowCount } =
      await sql`UPDATE facturacion SET factura_formapago = ${formapago}, factura_precio = ${precio}  WHERE factura_id = ${id};`;
    if (rowCount == 0) {
      return res.status(404).json({ status: 'NotFound' });
    }
    return res.status(200).json({ status: 'success' });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
});

router.post("/factura/:consulta_id", async (req, res) => {
  try {
    const consulta_id = req.params.consulta_id;
    const formapago = req.body.factura_formapago;
    const precio = req.body.factura_precio;
    const { rows, rowCount } =
      await sql`INSERT INTO facturacion VALUES (nextval('seqFactura'), ${consulta_id}, ${formapago}, ${precio});`;

    if (rowCount == 0) {
      return res.status(404).json({ status: 'NotFound' });
    }
    return res.status(200).json({ status: 'success' });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
});

router.get("/factura", async (req, res) => {
  try {
    const { rows, rowCount } = await sql`SELECT * FROM facturacion;`;
    if (rowCount == 0) {
      return res.status(404).json({ status: 'NotFound' });
    }
    return res.status(200).json({ rows: rows });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
});

module.exports = router;
