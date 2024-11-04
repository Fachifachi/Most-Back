const PorcentajeIva = require('../models/porcentajeIvaModel');

// Obtener todos los porcentajes de IVA
const getAllPorcentajesIva = (req, res) => {
    PorcentajeIva.getAllPorcentajesIva((err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
};

// Crear un nuevo porcentaje de IVA
const createPorcentajeIva = (req, res) => {
  const newPorcentajeIva = {
      nombre_porcentaje: req.body.nombre_porcentaje,
      descripcion_porcentaje: req.body.descripcion_porcentaje,
      porcentaje: req.body.porcentaje,
      activo: 1 // Establece por defecto como activo
  };
  PorcentajeIva.createPorcentajeIva(newPorcentajeIva, (err, results) => {
      if (err) {
          return res.status(500).json({ error: err.message });
      }
      res.json({ message: 'Porcentaje de IVA creado con éxito', data: results });
  });
};
// Actualizar un porcentaje de IVA
const updatePorcentajeIva = (req, res) => {
    const { id } = req.params;
    const updatedPorcentajeIva = req.body;
    PorcentajeIva.updatePorcentajeIva(id, updatedPorcentajeIva, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Porcentaje de IVA actualizado con éxito', data: results });
    });
};

// Deshabilitar un porcentaje de IVA
const disablePorcentajeIva = (req, res) => {
    const { id } = req.params;
    PorcentajeIva.disablePorcentajeIva(id, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Porcentaje de IVA deshabilitado con éxito', data: results });
    });
};

// Habilitar/Deshabilitar un porcentaje de IVA (toggle)
const toggleStatus = (req, res) => {
    const { id } = req.params;

    // Asegúrate de tener una validación para el ID
    if (!id) {
        return res.status(400).send('ID es requerido');
    }

    // Realiza la consulta para alternar el estado
    PorcentajeIva.toggleStatus(id, (err, result) => {
        if (err) {
            console.error('Error al cambiar estado del porcentaje de IVA:', err);
            return res.status(500).send('Error al cambiar el estado del porcentaje de IVA');
        }

        // Verifica si se actualizó algún registro
        if (result.affectedRows === 0) {
            return res.status(404).send('Porcentaje de IVA no encontrado');
        }

        res.status(200).send('Estado del porcentaje de IVA actualizado');
    });
};
const getFilteredPorcentajesIva = (req, res) => {
    const filtros = {
        nombre_porcentaje: req.query.nombre_porcentaje || '',
        activo: req.query.activo !== undefined ? parseInt(req.query.activo, 10) : null
    };

    console.log("Filtros recibidos:", filtros); // Depuración

    PorcentajeIva.getFilteredPorcentajesIva(filtros, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
};

module.exports = {
    getAllPorcentajesIva,
    createPorcentajeIva,
    updatePorcentajeIva,
    disablePorcentajeIva,
    toggleStatus,
    getFilteredPorcentajesIva, // Nueva función de filtrado
};
