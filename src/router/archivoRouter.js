const express = require("express");
const { sql } = require("@vercel/postgres");

const router = express.Router();

router.get("/archivo/:id", async (req, res) => {
  try {
    const { id } = req.params.id;
    const { rows, rowCount } =
      await sql`SELECT * FROM archivo WHERE archivo_id  = ${id};`;
    // res.send(req.params)
    if (rowCount === 0) {
      return res.send("No existe el Id buscado");
    }
    return res.json(rows);
  } catch (error) {
    console.log("Error en la API: " + error);
  }
});

router.delete("/archivo/:id", async (req, res) => {
  try {
    const { id } = req.params.id;
    const { rows, rowCount } =
      await sql`DELETE FROM archivo WHERE archivo_id  = ${id};`;
    // res.send(req.params)
    if (rowCount === 0) {
      return res.send("No existe el ID a borrar");
    }
    return res.send(rows);
  } catch (error) {
    console.log("Error en la API: " + error);
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
    // res.send(req.params)
    if (rowCount == 0) {
      return res.status(500).send("Error al Update en la Tabla Archivo");
    }
    return res.status(200).send(" Actualizado correctamente el Id:" + id );
  } catch (error) {
    console.log("Error en la API: " + error);
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
    // res.send(req.params)
    if (rowCount == 0) {
      return res.status(500).send("Error al Insertar en la Tabla Archivo");
    }
    return res.status(200).json(rows);
  } catch (error) {
    console.log("Error en la API: " + error);
  }
});

router.get("/archivo", async (req, res) => {
  try {
    const { rows, rowCount } = await sql`SELECT * FROM archivo;`;
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
//export default router;