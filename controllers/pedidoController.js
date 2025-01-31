const pedidoModel = require('../models/pedidoModel');
// Crear un nuevo pedido
exports.createPedido = (req, res) => {
    const newPedido = req.body;
    const insumos = newPedido.insumos;
  
    pedidoModel.createPedido({ nombre_cliente: newPedido.nombre_cliente, lugar_consumo: newPedido.lugar_consumo }, (err, results) => {
      if (err) {
        return res.status(500).json({ message: err.message });
      }
  
      const id_pedido = results.insertId;
  
      // Agregar insumos al pedido
      if (insumos) {
        pedidoModel.addInsumosToPedido(id_pedido, insumos, (err) => {
          if (err) {
            return res.status(500).json({ message: err.message });
          }
  
          res.status(201).json({ id_pedido, ...newPedido });
        });
      } else {
        res.status(201).json({ id_pedido, ...newPedido });
      }
    });
  };
  
  
// Agregar insumos a un pedido
exports.addInsumosToPedido = (req, res) => {
    const { id_pedido } = req.params;
    const insumos = req.body;
  
    pedidoModel.addInsumosToPedido(id_pedido, insumos, (err) => {
      if (err) {
        return res.status(500).json({ message: err.message });
      }
      res.json({ message: 'Insumos agregados correctamente' });
    });
  };
// Obtener todos los pedidos
exports.getAllPedidos = (req, res) => {
    pedidoModel.getAllPedidos((err, results) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        res.json(results);
    });
};
