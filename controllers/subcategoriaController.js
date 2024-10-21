// controllers/subcategoriaController.js
const subcategoriaModel = require('../models/subcategoriaModel');

// Obtener todas las subcategorías
const getSubcategorias = async (req, res) => {
  try {
    const subcategorias = await subcategoriaModel.getSubcategorias();
    res.json(subcategorias);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener subcategorías' });
  }
};

// Agregar una nueva subcategoría
const addSubcategoria = async (req, res) => {
  const { nombre_sub_categoria, descripcion_sub_categoria, id_procentaje_iva, estado_sub_categoria } = req.body;
  try {
    const newSubcategoriaId = await subcategoriaModel.addSubcategoria(nombre_sub_categoria, descripcion_sub_categoria, id_procentaje_iva, estado_sub_categoria);
    res.status(201).json({ id: newSubcategoriaId });
  } catch (error) {
    res.status(500).json({ error: 'Error al agregar subcategoría' });
  }
};

// Actualizar una subcategoría
const updateSubcategoria = async (req, res) => {
  const { id_sub_categoria } = req.params;
  const { estado_sub_categoria } = req.body;
  try {
    const affectedRows = await subcategoriaModel.updateSubcategoria(id_sub_categoria, estado_sub_categoria);
    if (affectedRows === 0) {
      return res.status(404).json({ error: 'Subcategoría no encontrada' });
    }
    res.json({ message: 'Subcategoría actualizada' });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar subcategoría' });
  }
};

// Eliminar (desactivar) una subcategoría
const deleteSubcategoria = async (req, res) => {
  const { id_sub_categoria } = req.params;
  try {
    const affectedRows = await subcategoriaModel.deleteSubcategoria(id_sub_categoria);
    if (affectedRows === 0) {
      return res.status(404).json({ error: 'Subcategoría no encontrada' });
    }
    res.json({ message: 'Subcategoría desactivada' });
  } catch (error) {
    res.status(500).json({ error: 'Error al desactivar subcategoría' });
  }
};

module.exports = {
  getSubcategorias,
  addSubcategoria,
  updateSubcategoria,
  deleteSubcategoria,
};
