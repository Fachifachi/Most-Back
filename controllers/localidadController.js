const Localidad = require('../models/localidadModel');

class LocalidadController {
    // Obtener todas las localidades
    static async obtenerTodas(req, res) {
        try {
            const localidades = await Localidad.obtenerTodas();
            res.json(localidades);
        } catch (error) {
            console.error('Error al obtener localidades:', error);
            res.status(500).json({ message: 'Error al obtener localidades' });
        }
    }

    // Obtener localidades por provincia
    static async obtenerPorProvincia(req, res) {
        const { idProvincia } = req.params;

        if (!idProvincia) {
            return res.status(400).json({ message: 'El ID de la provincia es requerido' });
        }

        try {
            const localidades = await Localidad.obtenerPorProvincia(idProvincia);
            res.json(localidades);
        } catch (error) {
            console.error('Error al obtener localidades por provincia:', error);
            res.status(500).json({ message: 'Error al obtener localidades por provincia' });
        }
    }

    // Editar una localidad
    static async editar(req, res) {
        const { id_localidad } = req.params;
        const { nombre_localidad, id_provincia } = req.body;

        if (!nombre_localidad || !id_provincia) {
            return res.status(400).json({ message: 'Faltan datos requeridos' });
        }

        try {
            await Localidad.editar(id_localidad, nombre_localidad, id_provincia);
            res.status(200).json({ message: 'Localidad actualizada correctamente' });
        } catch (error) {
            console.error('Error al editar la localidad:', error);
            res.status(500).json({ message: 'Error al editar la localidad' });
        }
    }
}

module.exports = LocalidadController;
