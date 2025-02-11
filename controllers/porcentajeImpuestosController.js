const PorcentajeImpuestos = require('../models/porcentajeImpuestosModel');

// Obtener todos los porcentajes 
const getAllPorcentajesImpuestos = (req, res) => {
    PorcentajeImpuestos.getAllPorcentajesImpuestos((err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
};

// Crear un nuevo porcentaje 
const createPorcentajeImpuestos = (req, res) => {
  const newPorcentajeImpuestos = {
      nombre_porcentaje: req.body.nombre_porcentaje,
      descripcion_porcentaje: req.body.descripcion_porcentaje,
      porcentaje: req.body.porcentaje,
      activo: 1 // Establece por defecto como activo
  };
  PorcentajeImpuestos.createPorcentajeImpuestos(newPorcentajeImpuestos, (err, results) => {
      if (err) {
          return res.status(500).json({ error: err.message });
      }
      res.json({ message: 'Porcentaje creado con éxito', data: results });
  });
};
// Actualizar un porcentaje de 
const updatePorcentajeImpuestos = (req, res) => {
    const { id } = req.params;
    const updatedPorcentajeImpuestos = req.body;
    PorcentajeImpuestos.updatePorcentajeImpuestos(id, updatedPorcentajeImpuestos, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Porcentaje actualizado con éxito', data: results });
    });
};

// Deshabilitar un porcentaje 
const disablePorcentajeImpuestos = (req, res) => {
    const { id } = req.params;
    PorcentajeImpuestos.disablePorcentajeImpuestos(id, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Porcentaje  deshabilitado con éxito', data: results });
    });
};

// Habilitar/Deshabilitar un porcentaje
const toggleStatus = (req, res) => {
    const { id } = req.params;

    // Asegúrate de tener una validación para el ID
    if (!id) {
        return res.status(400).send('ID es requerido');
    }

    // Realiza la consulta para alternar el estado
    PorcentajeImpuestos.toggleStatus(id, (err, result) => {
        if (err) {
            console.error('Error al cambiar estado del porcentaje:', err);
            return res.status(500).send('Error al cambiar el estado del porcentaje ');
        }

        // Verifica si se actualizó algún registro
        if (result.affectedRows === 0) {
            return res.status(404).send('Porcentaje no encontrado');
        }

        res.status(200).send('Estado del porcentaje actualizado');
    });
};
const getFilteredPorcentajesImpuestos = (req, res) => {
    const filtros = {
        nombre_porcentaje: req.query.nombre_porcentaje || '',
        activo: req.query.activo !== undefined ? parseInt(req.query.activo, 10) : null
    };

    console.log("Filtros recibidos:", filtros); // Depuración

    PorcentajeImpuestos.getFilteredPorcentajesImpuestos(filtros, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
};

module.exports = {
    getAllPorcentajesImpuestos,
    createPorcentajeImpuestos,
    updatePorcentajeImpuestos,
    disablePorcentajeImpuestos,
    toggleStatus,
    getFilteredPorcentajesImpuestos, // Nueva función de filtrado
};
