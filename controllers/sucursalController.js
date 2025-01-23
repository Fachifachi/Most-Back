const Sucursal = require('../models/sucursalModel');
const Provincia = require('../models/provinciaModel');
const Localidad = require('../models/localidadModel');

class SucursalController {
    // Obtener la sucursal
    static async obtener(req, res) {
        try {
            const sucursal = await Sucursal.obtener();
            res.json(sucursal);
        } catch (error) {
            console.error('Error al obtener la sucursal:', error);
            res.status(500).json({ message: 'Error al obtener la sucursal' });
        }
    }

    static async editar(req, res) {
      const { id_sucursal } = req.params; // ID de la sucursal
      const data = req.body; // Datos enviados en el cuerpo de la solicitud

      // Validar entrada
      if (!data.nombre_sucursal || !data.cuit || !data.domicilio || !data.iva || !data.id_localidad) {
          return res.status(400).json({ message: 'Faltan datos requeridos' });
      }

      try {
          await Sucursal.editar(id_sucursal, data);
          res.json({ message: 'Sucursal actualizada exitosamente' });
      } catch (error) {
          console.error('Error al editar la sucursal:', error);
          res.status(500).json({ message: 'Error al editar la sucursal' });
      }
  }


    // Obtener todas las provincias
    static async obtenerProvincias(req, res) {
        try {
            const provincias = await Provincia.obtenerTodas();
            res.json(provincias);
        } catch (error) {
            console.error('Error al obtener provincias:', error);
            res.status(500).json({ message: 'Error al obtener provincias' });
        }
    }

    // Obtener localidades por provincia
    static async obtenerLocalidadesPorProvincia(req, res) {
        const { idProvincia } = req.params;
        
        try {
            const localidades = await Localidad.obtenerPorProvincia(idProvincia);
            res.json(localidades);
        } catch (error) {
            console.error('Error al obtener localidades por provincia:', error);
            res.status(500).json({ message: 'Error al obtener localidades por provincia' });
        }
    }
}

module.exports = SucursalController;
