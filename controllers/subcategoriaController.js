const Subcategoria = require('../models/subcategoriaModel');

class SubcategoriaController {

    // Listar subcategorías
    static async listar(req, res) {
        try {
            const subcategorias = await Subcategoria.listar();
            console.log(subcategorias);
            res.json(subcategorias);
        } catch (error) {
            console.error('Error al listar subcategorías:', error);
            res.status(500).json({ message: 'Error al listar subcategorías' });
        }
    }

    // Agregar subcategoría
    static async agregar(req, res) {
        console.log('Solicitud recibida para agregar subcategoría:', req.body);
        const { nombre_sub_categoria, descripcion_sub_categoria, id_categoria, id_porcentaje_iva, estado_sub_categoria } = req.body;
        try {
            await Subcategoria.agregar(nombre_sub_categoria, descripcion_sub_categoria, id_categoria, id_porcentaje_iva, estado_sub_categoria);
            res.json({ message: 'Subcategoría agregada exitosamente' });
        } catch (error) {
            console.error('Error al agregar subcategoría:', error);
            res.status(500).json({ message: 'Error al agregar subcategoría' });
        }
    }

    // Editar subcategoría
    static async editar(req, res) {
        const { id } = req.params;
        const { nombre_sub_categoria, descripcion_sub_categoria, id_categoria, id_porcentaje_iva, estado_sub_categoria } = req.body;
        try {
            await Subcategoria.editar(id, nombre_sub_categoria, descripcion_sub_categoria, id_categoria, id_porcentaje_iva, estado_sub_categoria);
            res.json({ message: 'Subcategoría actualizada exitosamente' });
        } catch (error) {
            console.error('Error al editar subcategoría:', error);
            res.status(500).json({ message: 'Error al editar subcategoría' });
        }
    }

    // Cambiar estado
    static async cambiarEstado(req, res) {
        const { id_sub_categoria, estado_sub_categoria } = req.body;
        try {
            await Subcategoria.cambiarEstado(id_sub_categoria, estado_sub_categoria);
            res.json({ message: 'Estado de subcategoría cambiado exitosamente' });
        } catch (error) {
            console.error('Error al cambiar el estado de la subcategoría:', error);
            res.status(500).json({ message: 'Error al cambiar estado' });
        }
    }

    // Obtener subcategoría por ID
    static async obtenerPorId(req, res) {
        const { id } = req.params; // Obteniendo el id de los parámetros
        try {
            const subcategoria = await Subcategoria.obtenerPorId(id);
            if (subcategoria) {
                res.json(subcategoria);
            } else {
                res.status(404).json({ message: 'Subcategoría no encontrada' });
            }
        } catch (error) {
            console.error('Error al obtener subcategoría:', error);
            res.status(500).json({ message: 'Error al obtener subcategoría' });
        }
    }
}

module.exports = SubcategoriaController;
