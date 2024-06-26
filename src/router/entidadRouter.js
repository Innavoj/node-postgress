const express = require("express");
const { sql } = require("@vercel/postgres");

const router = express.Router();

router.get("/entidad/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { rows, rowCount } =
      await sql`SELECT * FROM veterinaria WHERE veterinaria_id = ${id};`;
    // res.send(req.params)
    if (rowCount === 0) {
      return res.send("No existe el ID buscado :" + id);
    }
    return res.json(rows);
  } catch (error) {
    console.log("Error en la API: " + error);
  }
});

router.delete("/entidad/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { rows, rowCount } =
      await sql`DELETE FROM veterinaria WHERE veterinaria_id = ${id};`;
    // res.send(req.params)
    if (rowCount === 0) {
      return res.send("No existe el ID a borrar: " + id);
    }
    return res.send("Eliminado Correctamente el Id: " + id);
  } catch (error) {
    console.log("Error en la API: " + error);
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
    // res.send(req.params)
    if (rowCount == 0) {
      return res.status(500).send("Error al Update en la Tabla Veterinaria");
    }
    return res.status(200).send("Actualizado Correctamente el Id: " + id );
  } catch (error) {
    console.log("Error en la API: " + error);
  }
});

router.post("/entidad", async (req, res) => {
  try {
    const nombre = req.body.veterinaria_nombre;
    const telefono = req.body.veterinaria_telefono;
    const direccion = req.body.veterinaria_direccion;
    const { rows, rowCount} =
      await sql`INSERT INTO veterinaria VALUES (nextval('seqVeterinaria'), ${nombre}, ${telefono}, ${direccion});`;
    // res.send(req.params)
    if (rowCount == 0) {
      return res.status(500).send("Error al Insertar en la Tabla Veterinaria");
    }
    return res.status(200).json(rows);
  } catch (error) {
    console.log("Error en la API: " + error);
  }
});

router.get("/entidad", async (req, res) => {
  try {
    const { rows, rowCount } = await sql`SELECT * FROM veterinaria;`;
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
