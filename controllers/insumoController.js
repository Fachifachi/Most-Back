const Insumo = require('../models/insumoModel');

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
    static async agregar(req, res) {
        console.log('Solicitud recibida para agregar insumo:', req.body);
        const { id_sub_categoria, id_tamanio, nombre_insumo, descripcion_insumo, stock_insumo, precio_insumo, estado_insumo } = req.body;
        try {
            await Insumo.agregarInsumo(id_sub_categoria, id_tamanio, nombre_insumo, descripcion_insumo, stock_insumo, precio_insumo, estado_insumo);
            res.json({ message: 'Insumo agregado exitosamente' });
        } catch (error) {
            console.error('Error al agregar insumo:', error);
            res.status(500).json({ message: 'Error al agregar insumo' });
        }
    }

    // Editar insumo
    static async editar(req, res) {
        const { id } = req.params;
        const { id_sub_categoria, id_tamanio, nombre_insumo, descripcion_insumo, stock_insumo, precio_insumo, estado_insumo } = req.body;
    
        // Validar entrada
        if (!nombre_insumo || !id_sub_categoria || !id_tamanio) {
            return res.status(400).json({ message: 'Faltan datos requeridos' });
        }
    
        try {
            await Insumo.editarInsumo(id, id_sub_categoria, id_tamanio, nombre_insumo, descripcion_insumo, stock_insumo, precio_insumo, estado_insumo);
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
}

module.exports = InsumoController;
