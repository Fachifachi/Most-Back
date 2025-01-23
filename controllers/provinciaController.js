const Provincia = require('../models/provinciaModel');

class ProvinciaController {
    // Obtener todas las provincias
    static async obtenerTodas(req, res) {
        try {
            const provincias = await Provincia.obtenerTodas();
            res.json(provincias);
        } catch (error) {
            console.error('Error al obtener provincias:', error);
            res.status(500).json({ message: 'Error al obtener provincias' });
        }
    }

    // Editar una provincia
    static async editar(req, res) {
        const { id_provincia } = req.params;
        const { nombre_provincia } = req.body;

        if (!nombre_provincia) {
            return res.status(400).json({ message: 'El nombre de la provincia es requerido' });
        }

        try {
            await Provincia.editar(id_provincia, nombre_provincia);
            res.status(200).json({ message: 'Provincia actualizada correctamente' });
        } catch (error) {
            console.error('Error al editar la provincia:', error);
            res.status(500).json({ message: 'Error al editar la provincia' });
        }
    }
}

module.exports = ProvinciaController;
