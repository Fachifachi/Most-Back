const connection = require('../config/db');

class Localidad {
    // Obtener todas las localidades
    static async obtenerTodas() {
        const query = 'SELECT * FROM localidades';
        try {
            const [rows] = await connection.promise().query(query);
            return rows;
        } catch (error) {
            throw new Error('Error al obtener localidades: ' + error.message);
        }
    }

    // Obtener localidades por provincia
    static async obtenerPorProvincia(idProvincia) {
        const query = 'SELECT * FROM localidades WHERE id_provincia = ?';
        try {
            const [rows] = await connection.promise().query(query, [idProvincia]);
            return rows;
        } catch (error) {
            throw new Error('Error al obtener localidades por provincia: ' + error.message);
        }
    }

    // Editar una localidad
    static async editar(id, nombre, idProvincia) {
        const query = `
          UPDATE localidades 
          SET nombre_localidad = ?, id_provincia = ? 
          WHERE id_localidad = ?`;
          
        try {
            await connection.promise().query(query, [nombre, idProvincia, id]);
        } catch (error) {
            throw new Error('Error al editar la localidad: ' + error.message);
        }
    }
}

module.exports = Localidad;
