// models/subcategoriaModel.js
const connection = require('../config/db'); // Cambiar pool por connection

class Subcategoria {
    static async listar({ searchTerm = '', estado = null, idCategoria = null }) {
        let query = `
            SELECT 
                sc.id_sub_categoria,
                sc.nombre_sub_categoria,
                sc.descripcion_sub_categoria,
                sc.estado_sub_categoria,
                c.id_categoria,
                i.id_porcentaje,
                c.nombre_categoria,
                i.nombre_porcentaje
            FROM 
                subcategorias sc
            JOIN 
                categorias c ON sc.id_categoria = c.id_categoria
            JOIN 
                porcentajesimpuestos i ON sc.id_porcentaje = i.id_porcentaje
            WHERE 1=1`; // Usar 1=1 para facilitar la adición de condiciones

        const params = [];

        // Filtrado por término de búsqueda
        if (searchTerm) {
            query += ` AND sc.nombre_sub_categoria LIKE ?`;
            params.push(`%${searchTerm}%`);
        }

        // Filtrado por estado
        if (estado !== null) {
            query += ` AND sc.estado_sub_categoria = ?`;
            params.push(estado);
        }

        // Filtrado por categoría
        if (idCategoria !== null) {
            query += ` AND sc.id_categoria = ?`;
            params.push(idCategoria);
        }

        try {
            const [rows] = await connection.promise().query(query, params);
            return rows;
        } catch (error) {
            throw new Error('Error al listar subcategorías: ' + error.message);
        }
    }

    static async agregar(nombre, descripcion, idCategoria, idPorcentaje, estado = 1) {
        const query = `
            INSERT INTO subcategorias (nombre_sub_categoria, descripcion_sub_categoria, id_porcentaje, estado_sub_categoria, id_categoria)
            VALUES (?, ?, ?, ?, ?);
        `;
        try {
            await connection.promise().query(query, [nombre, descripcion, idPorcentaje, estado, idCategoria]);
        } catch (error) {
            throw new Error('Error al agregar subcategoría: ' + error.message);
        }
    }

    static async editar(id, nombre, descripcion, idCategoria, idPorcentaje, estado) {
        const query = `
            UPDATE subcategorias 
            SET 
                nombre_sub_categoria = ?, 
                descripcion_sub_categoria = ?, 
                id_categoria = ?, 
                id_porcentaje = ?, 
                estado_sub_categoria = ? 
            WHERE 
                id_sub_categoria = ?;
        `;
        try {
            await connection.promise().query(query, [nombre, descripcion, idCategoria, idPorcentaje, estado, id]);
        } catch (error) {
            throw new Error('Error al editar subcategoría: ' + error.message);
        }
    }

    static async cambiarEstado(id, estado) {
        const query = `
            UPDATE subcategorias 
            SET estado_sub_categoria = ? 
            WHERE id_sub_categoria = ?;
        `;
        try {
            await connection.promise().query(query, [estado, id]);
        } catch (error) {
            throw new Error('Error al cambiar estado de subcategoría: ' + error.message);
        }
    }

    static async obtenerPorId(id) {
        const query = `
            SELECT 
                s.id_sub_categoria, 
                s.nombre_sub_categoria, 
                s.descripcion_sub_categoria, 
                s.estado_sub_categoria, 
                c.id_categoria, 
                i.id_porcentaje
            FROM subcategorias s
            INNER JOIN categorias c ON s.id_categoria = c.id_categoria
            INNER JOIN porcentajesimpuestos i ON s.id_porcentaje = i.id_porcentaje
            WHERE s.id_sub_categoria = ?;
        `;
        try {
            const [rows] = await connection.promise().query(query, [id]);
            return rows[0];
        } catch (error) {
            throw new Error('Error al obtener subcategoría por ID: ' + error.message);
        }
    }
}

module.exports = Subcategoria;
