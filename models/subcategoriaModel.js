// models/subcategoriaModel.js
const connection = require('../config/db'); // Cambiar pool por connection

class Subcategoria {
    static async listar() {
        const query = `
            SELECT 
                s.id_sub_categoria, 
                s.nombre_sub_categoria, 
                s.descripcion_sub_categoria, 
                s.estado_sub_categoria, 
                c.nombre_categoria, 
                p.nombre_porcentaje
            FROM subcategorias s
            INNER JOIN categorias c ON s.id_categoria = c.id_categoria
            INNER JOIN porcentajesiva p ON s.id_porcentaje_iva = p.id_porcentaje_iva;
        `;
        const [rows] = await connection.promise().query(query); // Usar connection
        return rows;
    }

    static async agregar(nombre, descripcion, idCategoria, idPorcentajeIVA, estado) {
        const query = `
            INSERT INTO subcategorias (nombre_sub_categoria, descripcion_sub_categoria, id_categoria, id_porcentaje_iva, estado_sub_categoria)
            VALUES (?, ?, ?, ?, ?);
        `;
        await connection.promise().query(query, [nombre, descripcion, idCategoria, idPorcentajeIVA, estado]); // Usar connection
    }

    static async editar(id, nombre, descripcion, idCategoria, idPorcentajeIVA, estado) {
        const query = `
            UPDATE subcategorias 
            SET nombre_sub_categoria = ?, descripcion_sub_categoria = ?, id_categoria = ?, id_porcentaje_iva = ?, estado_sub_categoria = ?
            WHERE id_sub_categoria = ?;
        `;
        await connection.promise().query(query, [nombre, descripcion, idCategoria, idPorcentajeIVA, estado, id]); // Usar connection
    }

    static async cambiarEstado(id, estado) {
        const query = `
            UPDATE subcategorias 
            SET estado_sub_categoria = ? 
            WHERE id_sub_categoria = ?;
        `;
        await connection.promise().query(query, [estado, id]); // Usar connection
    }

    static async obtenerPorId(id) {
        const query = `
            SELECT 
                s.id_sub_categoria, 
                s.nombre_sub_categoria, 
                s.descripcion_sub_categoria, 
                s.estado_sub_categoria, 
                c.id_categoria, 
                p.id_porcentaje_iva
            FROM subcategorias s
            INNER JOIN categorias c ON s.id_categoria = c.id_categoria
            INNER JOIN porcentajes_iva p ON s.id_porcentaje_iva = p.id_porcentaje_iva
            WHERE s.id_sub_categoria = ?;
        `;
        const [rows] = await connection.promise().query(query, [id]); // Usar connection
        return rows[0];
    }
}

module.exports = Subcategoria;
