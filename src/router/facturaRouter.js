const express = require("express");
const { sql } = require("@vercel/postgres");

const router = express.Router();

router.get("/factura/:id", async (req, res) => {
  try {
    const { id } = req.params.id;
    const { rows, rowCount } =
      await sql`SELECT * FROM facturacion WHERE factura_id = ${id};`;
    // res.send(req.params)
    if (rowCount === 0) {
      return res.send("No existe el Id buscado");
    }
    return res.json(rows);
  } catch (error) {
    console.log("Error en la API: " + error);
  }
});

router.delete("/factura/:id", async (req, res) => {
  try {
    const { id } = req.params.id;
    const { rows, rowCount } =
      await sql`DELETE FROM facturacion WHERE factura_id = ${id};`;
    // res.send(req.params)
    if (rowCount === 0) {
      return res.send("No existe el ID a borrar");
    }
    return res.status(200).json('Success');
  } catch (error) {
    console.log("Error en la API: " + error);
  }
});

router.put("/factura/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const formapago = req.body.factura_formapago;
    const precio =  req.body.factura_precio;

    const { rows, rowCount } =
      await sql`UPDATE facturacion SET factura_formapago = ${formapago}, factura_precio = ${precio}  WHERE factura_id = ${id};`;
    // res.send(req.params)
    if (rowCount == 0) {
      return res.status(500).send("Error al Update en la Tabla Facturacion");
    }
    return res.status(200).json('Success');
  } catch (error) {
    console.log("Error en la API: " + error);
  }
});

router.post("/factura/:consulta_id", async (req, res) => {
  try {
    const consulta_id = req.params.consulta_id;
    const formapago = req.body.factura_formapago;
    const precio =  req.body.factura_precio;

    const { rows, rowCount } =
      await sql`INSERT INTO facturacion VALUES (nextval('seqFactura'), ${consulta_id}, ${formapago}, ${precio});`;
    // res.send(req.params)
    if (rowCount == 0) {
      return res.status(500).send("Error al Insertar en la Tabla Facturacion");
    }
    return res.status(200).json('Success');
  } catch (error) {
    console.log("Error en la API: " + error);
  }
});

router.get("/factura", async (req, res) => {
  try {
    const { rows, rowCount } = await sql`SELECT * FROM facturacion;`;
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