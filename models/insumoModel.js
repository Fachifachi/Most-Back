const connection = require('../config/db');

// Obtener todos los insumos
const listarInsumos = async () => {
    const query = `
        SELECT 
            i.id_insumo,
            i.nombre_insumo,
            i.descripcion_insumo,
            i.stock_insumo,
            i.precio_insumo,
            i.estado_insumo,
            sc.id_sub_categoria,
            sc.nombre_sub_categoria,
            t.id_tamanio,
            t.nombre_tamanio
        FROM 
            insumos i
        JOIN 
            subcategorias sc ON i.id_sub_categoria = sc.id_sub_categoria
        JOIN 
            tamanios t ON i.id_tamanio = t.id_tamanio;
    `;
    try {
        const [rows] = await connection.promise().query(query);
        return rows;
    } catch (error) {
        throw new Error('Error al listar insumos: ' + error.message);
    }
};

// Agregar un nuevo insumo
const agregarInsumo = async (idSubCategoria, idTamanio, nombre, descripcion, stock, precio, estado = 1) => {
    const query = `
        INSERT INTO insumos (id_sub_categoria, id_tamanio, nombre_insumo, descripcion_insumo, stock_insumo, precio_insumo, estado_insumo)
        VALUES (?, ?, ?, ?, ?, ?, ?);
    `;
    try {
        const [result] = await connection.promise().query(query, [idSubCategoria, idTamanio, nombre, descripcion, stock, precio, estado]);
        return result.insertId;
    } catch (error) {
        throw new Error('Error al agregar insumo: ' + error.message);
    }
};

// Editar un insumo existente
const editarInsumo = async (id, idSubCategoria, idTamanio, nombre, descripcion, stock, precio, estado) => {
    const query = `
        UPDATE insumos 
        SET 
            id_sub_categoria = ?, 
            id_tamanio = ?, 
            nombre_insumo = ?, 
            descripcion_insumo = ?, 
            stock_insumo = ?, 
            precio_insumo = ?, 
            estado_insumo = ? 
        WHERE 
            id_insumo = ?;
    `;
    try {
        const [result] = await connection.promise().query(query, [idSubCategoria, idTamanio, nombre, descripcion, stock, precio, estado, id]);
        return result.affectedRows;
    } catch (error) {
        throw new Error('Error al editar insumo: ' + error.message);
    }
};

// Cambiar el estado (habilitar/deshabilitar) de un insumo
const cambiarEstadoInsumo = async (id, estado) => {
    const query = `
        UPDATE insumos 
        SET estado_insumo = ? 
        WHERE id_insumo = ?;
    `;
    try {
        const [result] = await connection.promise().query(query, [estado, id]);
        return result.affectedRows;
    } catch (error) {
        throw new Error('Error al cambiar estado del insumo: ' + error.message);
    }
};

// Obtener un insumo por su ID
const obtenerInsumoPorId = async (id) => {
    const query = `
        SELECT 
            i.id_insumo, 
            i.nombre_insumo, 
            i.descripcion_insumo, 
            i.stock_insumo, 
            i.precio_insumo, 
            i.estado_insumo, 
            sc.id_sub_categoria, 
            sc.nombre_sub_categoria,
            t.id_tamanio,
            t.nombre_tamanio
        FROM 
            insumos i
        JOIN 
            subcategorias sc ON i.id_sub_categoria = sc.id_sub_categoria
        JOIN 
            tamanios t ON i.id_tamanio = t.id_tamanio
        WHERE 
            i.id_insumo = ?;
    `;
    try {
        const [rows] = await connection.promise().query(query, [id]);
        return rows[0];
    } catch (error) {
        throw new Error('Error al obtener insumo por ID: ' + error.message);
    }
};

// Obtener todas las subcategorías
const listarSubcategorias = async () => {
    const query = `SELECT id_sub_categoria, nombre_sub_categoria FROM subcategorias`;
    try {
        const [rows] = await connection.promise().query(query);
        return rows;
    } catch (error) {
        throw new Error('Error al listar subcategorías: ' + error.message);
    }
};

// Obtener todos los tamaños
const listarTamanios = async () => {
    const query = `SELECT id_tamanio, nombre_tamanio FROM tamanios`;
    try {
        const [rows] = await connection.promise().query(query);
        return rows;
    } catch (error) {
        throw new Error('Error al listar tamaños: ' + error.message);
    }
};

module.exports = {
    listarInsumos,
    agregarInsumo,
    editarInsumo,
    cambiarEstadoInsumo,
    obtenerInsumoPorId,
    listarSubcategorias,
    listarTamanios,
};