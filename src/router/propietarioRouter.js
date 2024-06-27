const express = require("express");
const { sql } = require("@vercel/postgres");

const router = express.Router();

router.get("/propietario/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { rows, rowCount } =
      await sql`SELECT * FROM propietario WHERE propietario_id  = ${id};`;
    // res.send(req.params)
    if (rowCount === 0) {
      return res.send("No existe el Id buscado");
    }
    return res.json(rows);
  } catch (error) {
    console.log("Error en la API: " + error);
  }
});

router.delete("/propietario/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { rows, rowCount } =
      await sql`DELETE FROM propietario WHERE propietario_id  = ${id};`;
    // res.send(req.params)
    if (rowCount === 0) {
      return res.send("No existe el ID a borrar");
    }
    return res.send(rows);
  } catch (error) {
    console.log("Error en la API: " + error);
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
    // res.send(req.params)
    if (rowCount == 0) {
      return res.status(500).send("Error al Update en la Tabla Propietario");
    }
    return res.status(200).send(" Actualizado correctamente el Id:" + id );
  } catch (error) {
    console.log("Error en la API: " + error);
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
    // res.send(req.params)
    if (rowCount == 0) {
      return res.status(500).send("Error al Insertar en la Tabla propietario");
    }
    return res.status(200).json(rows);
  } catch (error) {
    console.log("Error en la API: " + error);
  }
});

router.get("/propietario", async (req, res) => {
  try {
    const { rows, rowCount } = await sql`SELECT * FROM propietario;`;
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