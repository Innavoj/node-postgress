const express = require("express");
const { sql } = require("@vercel/postgres");

const router = express.Router();

router.get("/inventario/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { rows, rowCount } =
      await sql`SELECT * FROM inventario WHERE inventario_id  = ${id};`;
    if (rowCount === 0) {
      return res.status(404).json({ status: 'NotFound' });
    }
    return res.status(200).json({ rows: rows });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
});

router.delete("/inventario/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { rows, rowCount } =
      await sql`DELETE FROM inventario WHERE inventario_id = ${id};`;
    if (rowCount === 0) {
      return res.status(404).json({ status: 'NotFound' });
    }
    return res.status(200).json({ status: 'success' });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
});

router.put("/inventario/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const codigo = req.body.inventario_cod;
    const descrip = req.body.inventario_dsc;
	const categoria = req.body.inventario_categoria;
	const cantidad = req.body.inventario_cantidad;
	const umedida = req.body.inventario_umedida;
	const nivel = req.body.inventario_nivel;
	const fechaE = req.body.inventario_fechaE;
	const fechaS = req.body.inventario_fechaS;
	const cantidadmov = req.body.inventario_cantidad_mov;
	const motivomov = req.body.inventario_motivo_mov;
	const ubicacion = req.body.inventario_ubicacion;
	const estadoproducto = req.body.inventario_estado_producto;
	const fechaV = req.body.inventario_fechaV;
	const lote = req.body.inventario_lote;
	const preciocosto = req.body.inventario_precio_costo;
	const precioventa = req.body.inventario_precio_venta;
	const valortotal = req.body.inventario_valor_total;

    const { rows, rowCount } =
      await sql`UPDATE inventario SET inventario_cod = ${codigo}, inventario_dsc = ${descrip}, inventario_categoria = ${categoria}, inventario_cantidad = ${cantidad},
      inventario_umedida = ${umedida}, inventario_nivel = ${nivel}, inventario_fechaE = ${fechaE}, inventario_fechaS = ${fechaS}, inventario_cantidad_mov = ${cantidadmov},
      inventario_motivo_mov = ${motivomov}, inventario_ubicacion = ${ubicacion}, inventario_estado_producto = ${estadoproducto}, inventario_fechaV = ${fechaV},
      inventario_lote = ${lote}, inventario_precio_costo = ${preciocosto}, inventario_precio_venta = ${precioventa}, inventario_valor_total = ${valortotal} 
      WHERE inventario_id = ${id};`;

    if (rowCount == 0) {
      return res.status(404).json({ status: 'NotFound' });
    }
    return res.status(200).json({ status: 'success' });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
});

router.post("/inventario", async (req, res) => {
  try {
    const codigo = req.body.inventario_cod;
    const descrip = req.body.inventario_dsc;
	const categoria = req.body.inventario_categoria;
	const cantidad = req.body.inventario_cantidad;
	const umedida = req.body.inventario_umedida;
	const nivel = req.body.inventario_nivel;
	const fechaE = req.body.inventario_fechaE;
	const fechaS = req.body.inventario_fechaS;
	const cantidadmov = req.body.inventario_cantidad_mov;
	const motivomov = req.body.inventario_motivo_mov;
	const ubicacion = req.body.inventario_ubicacion;
	const estadoproducto = req.body.inventario_estado_producto;
	const fechaV = req.body.inventario_fechaV;
	const lote = req.body.inventario_lote;
	const preciocosto = req.body.inventario_precio_costo;
	const precioventa = req.body.inventario_precio_venta;
	const valortotal = req.body.inventario_valor_total;
    const { rows, rowCount }  =
    await sql`INSERT INTO inventario VALUES (nextval('seqInventario'), ${codigo}, ${descrip}, ${categoria}, ${cantidad}, 
    ${umedida}, ${nivel}, ${fechaE}, ${fechaS}, ${cantidadmov}, ${motivomov}, ${ubicacion}, ${estadoproducto}, ${fechaV}, 
    ${lote}, ${preciocosto}, ${precioventa}, ${valortotal});`;
    if (rowCount == 0) {
      return res.status(404).json({ status: 'NotFound' });
    }
    return res.status(200).json({ status: 'success' });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
});

router.get("/inventario", async (req, res) => {
  try {
    const { rows, rowCount } = await sql`SELECT * FROM inventario;`;
    if (rowCount == 0) {
      return res.status(404).json({ status: 'NotFound' });
    }
    return res.status(200).json({ rows: rows });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
});

module.exports = router;