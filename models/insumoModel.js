const connection = require('../config/db');

// Obtener todos los insumos
const listarInsumos = async () => {
    const query = `
        SELECT 
            i.id_insumo,
            i.nombre_insumo,
            i.descripcion_insumo,

            i.precio_insumo,
            i.estado_insumo,
            sc.id_sub_categoria,
            sc.nombre_sub_categoria,
            t.id_tamanio,
            t.nombre_tamanio,
            p.porcentaje AS porcentaje_impuesto -- Añadimos el porcentaje
        FROM 
            insumos i
        JOIN 
            subcategorias sc ON i.id_sub_categoria = sc.id_sub_categoria
        JOIN 
            tamanios t ON i.id_tamanio = t.id_tamanio
        JOIN
            porcentajesimpuestos p ON sc.id_porcentaje = p.id_porcentaje; -- Unimos con la tabla de porcentajes
    `;
    try {
        const [rows] = await connection.promise().query(query);
        return rows;
    } catch (error) {
        throw new Error('Error al listar insumos: ' + error.message);
    }
};

// Agregar un nuevo insumo
const agregarInsumo = async (idSubCategoria, idTamanio, nombre, descripcion, precio, estado = 1) => {
    const query = `
        INSERT INTO insumos (id_sub_categoria, id_tamanio, nombre_insumo, descripcion_insumo, precio_insumo, estado_insumo)
        VALUES (?, ?, ?, ?, ?, ?);
    `;
    try {
        const [result] = await connection.promise().query(query, [idSubCategoria, idTamanio, nombre, descripcion, precio, estado]);
        return result.insertId;
    } catch (error) {
        throw new Error('Error al agregar insumo: ' + error.message);
    }
};

// Editar un insumo existente
const editarInsumo = async (id, idSubCategoria, idTamanio, nombre, descripcion,  precio, estado) => {
    const query = `
        UPDATE insumos 
        SET 
            id_sub_categoria = ?, 
            id_tamanio = ?, 
            nombre_insumo = ?, 
            descripcion_insumo = ?, 
      
            precio_insumo = ?, 
            estado_insumo = ? 
        WHERE 
            id_insumo = ?;
    `;
    try {
        const [result] = await connection.promise().query(query, [idSubCategoria, idTamanio, nombre, descripcion,  precio, estado, id]);
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

// Obtener un insumo por su ID con el porcentaje de impuesto
// Obtener un insumo por su ID
// Obtener un insumo por su ID con el porcentaje de impuesto
const obtenerInsumoPorId = async (id) => {
    const query = `
        SELECT 
            i.id_insumo, 
            i.nombre_insumo, 
            i.descripcion_insumo, 
            i.precio_insumo, 
            i.estado_insumo, 
            sc.id_sub_categoria, 
            sc.nombre_sub_categoria,
            t.id_tamanio,
            t.nombre_tamanio,
            p.porcentaje AS porcentaje_impuesto,
            c.id_categoria,
            c.nombre_categoria
        FROM 
            insumos i
        JOIN 
            subcategorias sc ON i.id_sub_categoria = sc.id_sub_categoria
        JOIN 
            tamanios t ON i.id_tamanio = t.id_tamanio
        JOIN
            porcentajesimpuestos p ON sc.id_porcentaje = p.id_porcentaje
        JOIN
            categorias c ON sc.id_categoria = c.id_categoria  -- Unir con la tabla de categorías
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
// Obtener todas las categorías
const listarCategorias = async () => {
    const query = `SELECT id_categoria, nombre_categoria FROM categorias`;
    try {
        const [rows] = await connection.promise().query(query);
        return rows;
    } catch (error) {
        throw new Error('Error al listar categorías: ' + error.message);
    }
};
const obtenerSubcategoriasPorCategoria = async (id_categoria) => {
    const query = `
        SELECT id_sub_categoria, nombre_sub_categoria 
        FROM subcategorias 
        WHERE id_categoria = ? AND estado_sub_categoria = 1; -- Solo subcategorías activas
    `;
    console.log('Consulta SQL ejecutada:', query, 'con parámetros:', [id_categoria]); // Agregar log para depuración
    try {
        const [rows] = await connection.promise().query(query, [id_categoria]);
        return rows;
    } catch (error) {
        throw new Error('Error al obtener subcategorías por categoría: ' + error.message);
    }
};

// Exportar las funciones necesarias
module.exports = {
    listarInsumos,
    agregarInsumo,
    editarInsumo,
    cambiarEstadoInsumo,
    obtenerInsumoPorId,
    listarSubcategorias,
    listarTamanios,
    listarCategorias,
    obtenerSubcategoriasPorCategoria, // Asegúrate de exportar esta función
};