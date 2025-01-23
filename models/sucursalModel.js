const connection = require('../config/db');

class Sucursal {
    // Obtener la sucursal con nombres de provincia y localidad
    static async obtener() {
        const query = `
            SELECT 
                s.id_sucursal, 
                s.nombre_sucursal, 
                s.cuit, 
                s.inicio_actividades, 
                s.ingresos_brutos, 
                s.domicilio, 
                s.iva, 
                s.estado_sucursal,
                s.id_localidad,
                l.nombre_localidad,
                l.id_provincia,
                p.nombre_provincia
            FROM sucursales s
            JOIN localidades l ON s.id_localidad = l.id_localidad
            JOIN provincias p ON l.id_provincia = p.id_provincia
            LIMIT 1;
        `;
        try {
            const [rows] = await connection.promise().query(query);
            return rows[0]; // Como solo hay una sucursal, devolvemos la primera
        } catch (error) {
            throw new Error('Error al obtener la sucursal: ' + error.message);
        }
    }

    // Editar la sucursal
    static async editar(id, data) {
        const query = `
            UPDATE sucursales 
            SET 
                nombre_sucursal = ?, 
                cuit = ?, 
                inicio_actividades = ?, 
                ingresos_brutos = ?, 
                domicilio = ?, 
                iva = ?, 
                estado_sucursal = ?,
                id_localidad = ?
            WHERE id_sucursal = ?;
        `;
        const { nombre_sucursal, cuit, inicio_actividades, ingresos_brutos, domicilio, iva, estado_sucursal, id_localidad } = data;

        try {
            await connection.promise().query(query, [
                nombre_sucursal,
                cuit,
                inicio_actividades,
                ingresos_brutos,
                domicilio,
                iva,
                estado_sucursal,
                id_localidad,
                id
            ]);
        } catch (error) {
            throw new Error('Error al editar la sucursal: ' + error.message);
        }
    }
}

module.exports = Sucursal;
