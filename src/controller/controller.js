const { sql } = require("@vercel/postgres");

 const getEntidad = async (req, res) => {
    try {
        const { entidad } = req.body;
        const enti = await sql`SELECT * FROM entidad;`
        if (enti.fields === 'entidad') throw console.log('Entidad ya registrada');
    } catch (error) {
        console.log(error)
    }

 };
