const connection = require('../config/db');

class Provincia {
    // Obtener todas las provincias
    static async obtenerTodas() {
        const query = 'SELECT * FROM provincias';
        try {
            const [rows] = await connection.promise().query(query);
            return rows;
        } catch (error) {
            throw new Error('Error al obtener provincias: ' + error.message);
        }
    }

    // Editar una provincia
    static async editar(id, nombre) {
        const query = 'UPDATE provincias SET nombre_provincia = ? WHERE id_provincia = ?';
        try {
            await connection.promise().query(query, [nombre, id]);
        } catch (error) {
            throw new Error('Error al editar la provincia: ' + error.message);
        }
    }
}

module.exports = Provincia;
