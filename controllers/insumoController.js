const Insumo = require('../models/insumoModel');
const connection = require('../config/db'); // Ajusta la ruta según tu estructura de carpetas

class InsumoController {

    // Listar insumos
    static async listar(req, res) {
        try {
            const insumos = await Insumo.listarInsumos();
            console.log(insumos);
            res.json(insumos);
        } catch (error) {
            console.error('Error al listar insumos:', error);
            res.status(500).json({ message: 'Error al listar insumos' });
        }
    }
// Listar todas las subcategorías
static async listarSubcategorias(req, res) {
    try {
        const subcategorias = await Insumo.listarSubcategorias();
        res.json(subcategorias);
    } catch (error) {
        console.error('Error al listar subcategorías:', error);
        res.status(500).json({ message: 'Error al listar subcategorías' });
    }
}
static async listarSubcategoriasPorCategoria(req, res) {
    const { id_categoria } = req.query; // Obtén el ID de la categoría desde los parámetros de consulta

    if (!id_categoria) {
        return res.status(400).json({ message: 'El ID de la categoría es requerido' });
    }

    try {
        const subcategorias = await Insumo.obtenerSubcategoriasPorCategoria(id_categoria);
        res.json(subcategorias);
    } catch (error) {
        console.error('Error al listar subcategorías por categoría:', error);
        res.status(500).json({ message: 'Error al listar subcategorías por categoría' });
    }
}

// Listar todos los tamaños
static async listarTamanios(req, res) {
    try {
        const tamanios = await Insumo.listarTamanios();
        res.json(tamanios);
    } catch (error) {
        console.error('Error al listar tamaños:', error);
        res.status(500).json({ message: 'Error al listar tamaños' });
    }
}
    // Agregar insumo
// Agregar insumo
static async agregar(req, res) {
    const { id_sub_categoria, id_tamanio, nombre_insumo, descripcion_insumo, precio_insumo } = req.body;

    // Validar campos obligatorios
    if (!id_sub_categoria || !id_tamanio || !nombre_insumo || !precio_insumo) {
        return res.status(400).json({ message: 'Faltan datos requeridos' });
    }

    // Verificar si id_tamanio existe en la tabla tamanios
    const [tamanio] = await connection.promise().query('SELECT * FROM tamanios WHERE id_tamanio = ?', [id_tamanio]);
    if (tamanio.length === 0) {
        return res.status(400).json({ message: 'El id_tamanio no existe' });
    }

    try {
        await Insumo.agregarInsumo(id_sub_categoria, id_tamanio, nombre_insumo, descripcion_insumo, precio_insumo);
        res.json({ message: 'Insumo agregado exitosamente' });
    } catch (error) {
        console.error('Error al agregar insumo:', error);
        res.status(500).json({ message: 'Error al agregar insumo' });
    }
}
// Listar todas las categorías
static async listarCategorias(req, res) {
    try {
        const categorias = await Insumo.listarCategorias();
        res.json(categorias);
    } catch (error) {
        console.error('Error al listar categorías:', error);
        res.status(500).json({ message: 'Error al listar categorías' });
    }
}
static async listarSubcategoriasPorCategoria(req, res) {
    const { id_categoria } = req.query; // Obtener el ID de la categoría desde los parámetros de consulta

    if (!id_categoria) {
        return res.status(400).json({ message: 'El ID de la categoría es requerido' });
    }

    try {
        const subcategorias = await Insumo.obtenerSubcategoriasPorCategoria(id_categoria); // Llamar al modelo
        if (subcategorias.length > 0) {
            res.json(subcategorias); // Enviar las subcategorías encontradas
        } else {
            res.status(404).json({ message: 'No se encontraron subcategorías para esta categoría' });
        }
    } catch (error) {
        console.error('Error al listar subcategorías por categoría:', error);
        res.status(500).json({ message: 'Error al listar subcategorías por categoría' });
    }
}


    // Editar insumo
    static async editar(req, res) {
        const { id } = req.params;
        const { id_sub_categoria, id_tamanio, nombre_insumo, descripcion_insumo,  precio_insumo, estado_insumo } = req.body;
    
        // Validar entrada
        if (!nombre_insumo || !id_sub_categoria || !id_tamanio) {
            return res.status(400).json({ message: 'Faltan datos requeridos' });
        }
    
        try {
            await Insumo.editarInsumo(id, id_sub_categoria, id_tamanio, nombre_insumo, descripcion_insumo, precio_insumo, estado_insumo);
            res.json({ message: 'Insumo actualizado exitosamente' });
        } catch (error) {
            console.error('Error al editar insumo:', error);
            res.status(500).json({ message: 'Error al editar insumo' });
        }
    }

    // Cambiar estado de insumo
    static async cambiarEstado(req, res) {
        const { id_insumo, estado_insumo } = req.body;
        try {
            await Insumo.cambiarEstadoInsumo(id_insumo, estado_insumo);
            res.json({ message: 'Estado del insumo cambiado exitosamente' });
        } catch (error) {
            console.error('Error al cambiar el estado del insumo:', error);
            res.status(500).json({ message: 'Error al cambiar estado del insumo' });
        }
    }

    // Obtener insumo por ID
    static async obtenerPorId(req, res) {
        const { id } = req.params;
        try {
            const insumo = await Insumo.obtenerInsumoPorId(id);
            if (insumo) {
                res.json(insumo);
            } else {
                res.status(404).json({ message: 'Insumo no encontrado' });
            }
        } catch (error) {
            console.error('Error al obtener insumo:', error);
            res.status(500).json({ message: 'Error al obtener insumo' });
        }
    }
    static async listarSubcategoriasPorCategoria(req, res) {
        const { id_categoria } = req.query; // Obtener el ID de la categoría desde los parámetros de consulta
    
        console.log('ID de categoría recibido:', id_categoria); // Log para depuración
    
        if (!id_categoria) {
            return res.status(400).json({ message: 'El ID de la categoría es requerido' });
        }
    
        try {
            const subcategorias = await Insumo.obtenerSubcategoriasPorCategoria(id_categoria); // Llamar al modelo
            if (subcategorias.length > 0) {
                res.json(subcategorias); // Enviar las subcategorías encontradas
            } else {
                res.status(404).json({ message: 'No se encontraron subcategorías para esta categoría' });
            }
        } catch (error) {
            console.error('Error al listar subcategorías por categoría:', error);
            res.status(500).json({ message: 'Error al listar subcategorías por categoría' });
        }
    }
}

module.exports = InsumoController;
